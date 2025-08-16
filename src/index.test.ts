import { SELF, env } from 'cloudflare:test';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoistApi } from '@doist/todoist-api-typescript';

// Mock the Todoist API
vi.mock('@doist/todoist-api-typescript', () => {
	const TodoistApi = vi.fn();
	TodoistApi.prototype.getCompletedTasksByCompletionDate = vi.fn();
	TodoistApi.prototype.reopenTask = vi.fn();
	return { TodoistApi };
});

describe('Todoist Reopener Worker', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('fetch handler', () => {
		it('should return 404 for non-cron paths', async () => {
			const response = await SELF.fetch('http://localhost/');
			expect(response.status).toBe(404);
			const text = await response.text();
			expect(text).toBe('This worker is triggered by a cron schedule, not by HTTP requests.');
		});

		it('should return 401 for missing Authorization header', async () => {
			const response = await SELF.fetch('http://localhost/--run-cron');
			expect(response.status).toBe(401);
		});

		it('should return 403 for invalid token', async () => {
			const response = await SELF.fetch('http://localhost/--run-cron', {
				headers: { Authorization: 'Bearer invalid-token' },
			});
			expect(response.status).toBe(403);
		});

		it('should execute scheduled job with valid token', async () => {
			(TodoistApi.prototype.getCompletedTasksByCompletionDate as vi.Mock).mockResolvedValueOnce({
				items: [],
				nextCursor: null,
			});
			const response = await SELF.fetch('http://localhost/--run-cron', {
				headers: { Authorization: `Bearer ${env.CRON_SECRET_TOKEN}` },
			});
			expect(response.status).toBe(200);
			const text = await response.text();
			expect(text).toBe('Scheduled job executed manually.');
		});
	});

	describe('scheduled handler', () => {
		it('should reopen tasks with tracked or routine labels', async () => {
			const mockTasks = [
				{ id: '1', content: 'Task 1' },
				{ id: '2', content: 'Task 2' },
			];

			(TodoistApi.prototype.getCompletedTasksByCompletionDate as vi.Mock).mockResolvedValueOnce({
				items: mockTasks,
				nextCursor: null,
			});

			await SELF.scheduled();

			expect(TodoistApi.prototype.getCompletedTasksByCompletionDate).toHaveBeenCalledTimes(1);
			expect(TodoistApi.prototype.reopenTask).toHaveBeenCalledTimes(2);
			expect(TodoistApi.prototype.reopenTask).toHaveBeenCalledWith('1');
			expect(TodoistApi.prototype.reopenTask).toHaveBeenCalledWith('2');
		});

		it('should handle pagination correctly', async () => {
			(TodoistApi.prototype.getCompletedTasksByCompletionDate as vi.Mock)
				.mockResolvedValueOnce({
					items: [{ id: '1', content: 'Task 1' }],
					nextCursor: 'cursor-123',
				})
				.mockResolvedValueOnce({
					items: [{ id: '2', content: 'Task 2' }],
					nextCursor: null,
				});

			await SELF.scheduled();

			expect(TodoistApi.prototype.getCompletedTasksByCompletionDate).toHaveBeenCalledTimes(2);
			expect(TodoistApi.prototype.reopenTask).toHaveBeenCalledTimes(2);
		});
	});
});