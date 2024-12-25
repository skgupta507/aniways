/// <reference path="./.sst/platform/config.d.ts" />

require("./src/env");

export default $config({
  app(input) {
    return {
      name: "aniways",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const website = new sst.aws.Nextjs("website", {
      warm: 3,
      environment: {
        MAL_CLIENT_ID: process.env.MAL_CLIENT_ID!,
        MAL_CLIENT_SECRET: process.env.MAL_CLIENT_SECRET!,
        MAL_SECRET_KEY: process.env.MAL_SECRET_KEY!,
        DATABASE_URL: process.env.DATABASE_URL!,
      },
      domain: {
        name: "aniways.xyz",
        dns: sst.cloudflare.dns(),
      },
    });

    return {
      SiteUrl: website.url,
    };
  },
});
