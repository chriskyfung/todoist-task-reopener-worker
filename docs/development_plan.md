# Development Plan: Todoist Task Reopener Cloudflare Worker

This document outlines the plan to migrate the n8n workflow to a robust and reliable Cloudflare Worker.

## Phase 1: Project Scaffolding & Configuration

The first step is to create the necessary files and structure for a Cloudflare Worker project using TypeScript.

1. **Create `package.json`**: This file will manage project dependencies, such as `wrangler` for development/deployment and `typescript`.

    ```json
    {
      "name": "todoist-reopener-worker",
      "version": "1.0.0",
      "description": "A Cloudflare Worker that automatically reopens completed Todoist tasks.",
      "private": true,
      "main": "src/index.ts",
      "scripts": {
        "build": "wrangler deploy --dry-run --outdir=dist",
        "clean": "rm -rf dist node_modules",
        "deploy": "wrangler deploy",
        "dev": "wrangler dev",
        "lint": "eslint src/**/*.ts",
        "start": "wrangler dev",
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage",
        "tail": "wrangler tail"
      },
      "repository": {
        "type": "git",
        "url": "https://github.com/chriskyfung/todoist-reopener-worker"
      },
      "keywords": [
        "todoist",
        "cloudflare",
        "worker",
        "automation"
      ],
      "author": "Chris K.Y. Fung",
      "license": "MIT",
      "devDependencies": {
        "@cloudflare/workers-types": "^4.20240430.0",
        "@eslint/js": "^9.33.0",
        "@typescript-eslint/eslint-plugin": "^8.39.1",
        "@typescript-eslint/parser": "^8.39.1",
        "@vitest/coverage-v8": "^3.2.4",
        "eslint": "^8.57.1",
        "eslint-plugin-promise": "^7.2.1",
        "globals": "^16.3.0",
        "typescript": "^5.4.5",
        "typescript-eslint": "^8.39.1",
        "vitest": "^3.2.4",
        "vitest-environment-miniflare": "^2.14.4",
        "wrangler": "latest"
      },
      "dependencies": {
        "@doist/todoist-api-typescript": "^5.1.1",
        "tslib": "^2.8.1"
      }
    }
    ```

2. **Create `tsconfig.json`**: This file configures the TypeScript compiler.

    ```json
    {
      "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node",
        "lib": ["esnext"],
        "strict": true,
        "esModuleInterop": true,
        "outDir": "dist",
        "types": ["@cloudflare/workers-types"]
      },
      "include": ["src"]
    }
    ```

3. **Create `wrangler.toml`**: This is the main configuration file for the Cloudflare Worker. It defines the project name, entry point, and the crucial cron trigger for scheduling.

    ```toml
    name = "todoist-task-reopener"
    main = "src/index.ts"
    compatibility_date = "2024-05-01"

    [triggers]
    # Cron syntax for: "At 19:00 PM (UTC) on Sunday and Thursday, which is 03:00 AM (Asia/Hong_Kong) on Monday and Friday."
    crons = ["0 19 * * 0,4"]
    ```

## Phase 2: Worker Implementation (`src/index.ts`)

This is the core logic of the service, written in TypeScript.

1. **Define Environment:** Create a TypeScript interface to define the environment variables (secrets) that will be available to the worker, ensuring type safety. This includes the `TODOIST_API_TOKEN` and the `CRON_SECRET_TOKEN`.

2. **Create the `scheduled` Event Listener:** The worker's execution will be initiated by the cron trigger, which fires a `scheduled` event. All logic will be contained within this event handler.

3. **Fetch Completed Tasks:**
    * Retrieve the `TODOIST_API_TOKEN` from the environment secrets.
    * Construct the URL for the Todoist API endpoint: `https://api.todoist.com/api/v1/completed/get_all`.
    * Use the `fetch` API to make a POST request to Todoist, asking for all items completed since a specific date with the label `@tracked`.

4. **Filter and Reopen Tasks:**
    * Process the JSON response from the Todoist API.
    * Iterate through the list of completed tasks.
    * For each task, make a `POST` request to the Todoist API endpoint to reopen it: `https://api.todoist.com/api/v1/tasks/{task_id}/reopen`.

5. **Add Logging and Error Handling:** Wrap the logic in `try...catch` blocks to handle potential API failures or unexpected errors. Log informative messages to the console, which can be viewed using `wrangler tail`.

## Phase 3: Deployment & Operation

This phase outlines the final steps to get the worker running live.

1. **Install Dependencies:** Run `npm install` to download the `wrangler` CLI and TypeScript.

2. **Set API Token Secrets:** Securely provide your Todoist API token and a secret token for the manual trigger to the worker without hardcoding them. This is done with the following `wrangler` commands:

    ```bash
    npx wrangler secret put TODOIST_API_TOKEN
    npx wrangler secret put CRON_SECRET_TOKEN
    ```

    You will be prompted to paste your tokens in the terminal.

3. **Deploy the Worker:** Deploy the script and the cron trigger to the Cloudflare network with a single command:

    ```bash
    npx wrangler deploy
    ```

4. **Monitor the Worker:** After deployment, you can monitor the worker's execution logs (including any `console.log` statements or errors) in real-time using:

    ```bash
    npm run tail
    ```

## Phase 4: CI/CD and Automation

To ensure code quality, maintain security, and automate the development workflow, a CI/CD pipeline has been set up using GitHub Actions.

1.  **Continuous Integration:** A CI workflow is configured to run on every push and pull request to the `main` branch. This workflow performs the following checks:
    *   **Linting:** Ensures the code adheres to the project's coding standards.
    *   **Testing:** Runs the test suite to verify the functionality of the worker.
    *   **Building:** Compiles the TypeScript code to ensure it is valid.
    *   **Dependency Review:** Scans for vulnerable dependencies to prevent introducing security risks.
    *   **Test Coverage:** Uploads test coverage reports to Codecov to track the quality of the tests.

2.  **Security Scanning:** A CodeQL workflow is set up to perform static analysis of the code to find security vulnerabilities.

3.  **Dependency Management:** Dependabot is configured to automatically create pull requests to keep the project's dependencies up-to-date.

4.  **Release Automation:** A Release Drafter workflow is in place to automatically create draft release notes as pull requests are merged, simplifying the release process.