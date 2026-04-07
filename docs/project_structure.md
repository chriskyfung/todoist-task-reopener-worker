# Application Structure Overview

This document outlines the file and directory structure for the Todoist Reopener Cloudflare Worker project.

### Project Structure

```
.
├── .github
│   ├── dependabot.yml
│   ├── release-drafter.yml
│   └── workflows
│       ├── ci.yml
│       ├── codeql.yml
│       └── release-drafter.yml
├── eslint.config.js
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── LICENSE
├── README.md
├── GEMINI.md
├── package.json
├── src
│   └── index.ts
├── tsconfig.json
├── wrangler.toml
├── docs
│   ├── development_plan.md
│   └── project_structure.md
├── logs
│   ├── stderr.log
│   └── stdout.log
├── .env.example
├── .gitignore
├── .geminiignore
└── .dockerignore
```

### Overview of Files and Directories

- **`src/`**: This directory holds all of your worker's source code.
  - **`index.ts`**: This is the main entry point for the worker. It will contain all the TypeScript logic that gets executed when the cron trigger fires. This includes connecting to the Todoist API, fetching completed tasks, and sending the requests to reopen them.

- **`.github/`**: This directory contains all the GitHub Actions workflows and configurations.
  - **`dependabot.yml`**: Configuration for Dependabot to automatically update dependencies.
  - **`release-drafter.yml`**: Configuration for Release Drafter to automatically draft release notes.
  - **`workflows/`**: This directory contains all the GitHub Actions workflows.
    - **`ci.yml`**: The main CI/CD workflow that runs linting, testing, and building.
    - **`codeql.yml`**: The workflow for CodeQL to analyze the code for security vulnerabilities.
    - **`release-drafter.yml`**: The workflow for Release Drafter.

- **`docs/`**: This directory contains all the project documentation.
  - **`development_plan.md`**: This document outlines the plan to migrate the n8n workflow to a robust and reliable Cloudflare Worker.
  - **`project_structure.md`**: This document outlines the file and directory structure for the Todoist Reopener Cloudflare Worker project.

- **`logs/`**: This directory contains the log files for the application.
  - **`stderr.log`**: This file contains the standard error logs.
  - **`stdout.log`**: This file contains the standard output logs.

- **`.gitignore`**: A standard file that tells Git which files and folders to ignore, such as the `node_modules` directory where dependencies are installed and the `dist` folder where compiled code resides.

- **`.geminiignore`**: A file that tells the Gemini AI which files and folders to ignore.

- **`.dockerignore`**: A file that tells Docker which files and folders to ignore.

- **`.prettierignore`**: A file that tells Prettier which files and folders to ignore.

- **`.prettierrc.json`**: The configuration file for Prettier.

- **`eslint.config.js`**: The configuration file for ESLint, defining linting rules and settings for the project.

- **`package.json`**: The standard Node.js manifest file. It defines the project's name, scripts (like `npm run deploy`), and development dependencies (`wrangler`, `typescript`, and Cloudflare's type definitions).

- **`tsconfig.json`**: The configuration file for the TypeScript compiler. It tells the compiler how to translate your TypeScript code in the `src` directory into JavaScript that can run on Cloudflare's network.

- **`wrangler.toml`**: The configuration file for Cloudflare's command-line tool, `wrangler`. This is a crucial file where we define the worker's name, the entry point (`src/index.ts`), and most importantly, the `crons` trigger that schedules the worker to run automatically.

- **`Dockerfile`**: A file that contains instructions for building a Docker image for the application.

- **`LICENSE`**: The MIT License for the project.

- **`README.md`**: The main README file for the project.

- **`GEMINI.md`**: A file that contains instructions for the Gemini AI to work with the project.

- **`.env.example`**: An example file for the required environment variables.
