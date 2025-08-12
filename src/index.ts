import { TodoistApi, Task } from '@doist/todoist-api-typescript';

interface Env {
	TODOIST_API_TOKEN: string;
}

export default {
	// This is a temporary workaround for a wrangler bug.
	// It allows us to test the scheduled job by visiting a URL.
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		console.log(`Received fetch request for path: ${url.pathname}`); // Added for debugging

		if (url.pathname.startsWith('/--run-cron')) {
			console.log('Cron job triggered via fetch workaround...');
			await this.scheduled(null as any, env, ctx);
			return new Response('Scheduled job executed manually.');
		}
		return new Response('This worker is triggered by a cron schedule, not by HTTP requests.', { status: 404 });
		
	},

	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Cron job started: Reopening tracked/routine Todoist tasks.");

		try {
			const api = new TodoistApi(env.TODOIST_API_TOKEN);
			
			const allTasksToReopen: Task[] = [];
			let cursor: string | null = null;

			const since = new Date();
			since.setDate(since.getDate() - 90); // 90 days ago
			const until = new Date(); // Now

			do {
				console.log(cursor ? `Fetching next page with cursor: ${cursor}`: 'Fetching first page of completed tasks...');

				const response = await api.getCompletedTasksByCompletionDate({
					filterQuery: '@tracked | @routine',
					since: since.toISOString(),
					until: until.toISOString(),
					limit: 50, // Use the default limit
					cursor: cursor,
				});

				allTasksToReopen.push(...response.items);
				cursor = response.nextCursor;

			} while (cursor);


			console.log(`Found ${allTasksToReopen.length} total completed tasks with '@tracked' or '@routine' to reopen.`);

			for (const task of allTasksToReopen) {
				console.log(`Reopening task: "${task.content}" (ID: ${task.id})`);
				await api.reopenTask(task.id);
			}

			console.log("Cron job finished successfully.");

		} catch (error) {
			console.error("An error occurred during the cron job execution:");
			console.error(error);
		}
	},
};