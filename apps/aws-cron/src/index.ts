import type { AWS } from "@serverless/typescript";

export default {
  cron: {
    handler: "src/handlers/cron.main",
    timeout: 300,
    events: [
      {
        schedule: "cron(0 * * * ? *)", // every hour
      },
    ],
  },
} satisfies AWS["functions"];
