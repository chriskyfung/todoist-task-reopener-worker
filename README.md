# Todoist Task Reopener Cloudflare Worker

This project is a serverless Cloudflare Worker that automatically reopens completed Todoist tasks that have the label `tracked` or `routine`. It is designed as a robust, reliable, and secure replacement for a similar n8n workflow.

The worker runs on a schedule, checking for recently completed tasks and reopening them to ensure recurring items are not missed.

## Features

- **Automated Task Reopening:** Automatically reopens completed Todoist tasks with a specific label.
- **Serverless:** Runs on the Cloudflare Workers serverless platform.
- **Scheduled Execution:** Uses a cron trigger to run on a schedule.
- **Secure:** Uses Cloudflare's secrets store to manage the Todoist API token.
- **Stateless:** Does not store any data.

## Technologies

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Todoist API](https://developer.todoist.com/api/v1/#overview)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)

## Project Structure

```
.
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

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Cloudflare Account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chriskyfung/todoist-reopener-worker.git
   cd todoist-reopener-worker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set Todoist API Token:**

   Provide your API token to Cloudflare's secret manager. You will be prompted to paste the token.

   ```bash
   npx wrangler secret put TODOIST_API_TOKEN
   ```

## Commands

| Command | Description |
| --- | --- |
| `npm run build` | Build the project. |
| `npm run clean` | Remove the `dist` and `node_modules` directories. |
| `npm run deploy` | Deploy the worker. |
| `npm run dev` | Start the development server. |
| `npm run lint` | Lint the code. |
| `npm run start` | Start the development server. |
| `npm run test` | Run tests. |
| `npm run test:coverage` | Run tests with coverage. |
| `npm run tail` | View the logs of the worker in real-time. |

## Deployment

To deploy this worker, you will need a Cloudflare account and the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

1. **Deploy:**
   Deploy the worker and its cron trigger to your Cloudflare account.

   ```bash
   npx wrangler deploy
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.