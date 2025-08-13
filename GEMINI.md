# Gemini Project Instructions

This document provides instructions for the Gemini AI to work with the `todoist-reopener-worker` project.

## Project Overview

This project is a serverless Cloudflare Worker that automatically reopens completed Todoist tasks that have the label `tracked` or `routine`. It is designed as a robust, reliable, and secure replacement for a similar n8n workflow.

## Project Structure

```
.
├── .eslintrc.cjs
├── Dockerfile
├── LICENSE
├── README.md
├── package.json
├── src
│   └── index.ts
├── tsconfig.json
└── wrangler.toml
```

### Key Files and Directories

- **`src/`**: Contains the TypeScript source code for the Cloudflare Worker.
- **`docs/`**: Contains project documentation.
- **`logs/`**: Contains log files for the application.
- **`node_modules/`**: Contains all the project's dependencies.
- **`dist/`**: Contains the compiled JavaScript code.
- **`.env.example`**: An example file for the required environment variables.
- **`.gitignore`**: Specifies which files and directories to ignore in Git.
- **`.geminiignore`**: Specifies which files and directories to ignore for the Gemini AI.
- **`.dockerignore`**: Specifies which files and directories to ignore in Docker.
- **`.eslintrc.cjs`**: The configuration file for ESLint.
- **`Dockerfile`**: Defines the Docker image for the application.
- **`LICENSE`**: The MIT License for the project.
- **`package.json`**: The Node.js project manifest file.
- **`tsconfig.json`**: The TypeScript compiler configuration file.
- **`wrangler.toml`**: The Cloudflare Wrangler configuration file.

## Development

- **Language:** TypeScript
- **Runtime:** Cloudflare Workers
- **Package Manager:** npm
- **Deployment:** Cloudflare Wrangler

### Common Commands

- `npm install`: Install dependencies.
- `npm run build`: Build the project.
- `npm run clean`: Remove the `dist` and `node_modules` directories.
- `npm run dev`: Start the development server.
- `npm run deploy`: Deploy the worker.
- `npm run lint`: Lint the code.
- `npm run test`: Run tests.
- `npm run test:coverage`: Run tests with coverage.
- `npm run tail`: View the logs of the worker in real-time.

## Deployment

The `TODOIST_API_TOKEN` and `CRON_SECRET_TOKEN` are managed as secrets in Cloudflare. To deploy the worker, use the `npx wrangler deploy` command.

## Commits

This project uses the GitMoji convention for commit messages. Please use the following format:

`emoji type(scope): subject`

Common emojis:

- `✨ :sparkles: feat` (new features)
- `🐛 :bug: fix` (bug fixes)
- `📝 :memo: docs` (documentation)
- `🔧 :wrench: chore` (config files)
- `🔨 :hammer: chore` (dev scripts)
- `♻️ :recycle: refactor` (code refactoring)

For a full list, refer to https://gitmoji.dev.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.