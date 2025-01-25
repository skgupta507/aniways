import * as orm from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "drizzle.config";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  client?: postgres.Sql;
};

const client =
  globalForDrizzle.client ??
  postgres(env.DATABASE_URL, {
    prepare: false,
  });

if (process.env.NODE_ENV === "development") {
  globalForDrizzle.client = client;
}

const db = drizzle(client, {
  schema,
});

let isError = false;
let count = 50;

do {
  await migrate(db, {
    migrationsFolder: config.out ?? "./src/server/db/migrations",
  })
    .then(() => {
      isError = false;
    })
    .catch(async (error) => {
      console.error(error);
      isError = true;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });
} while (isError && count-- > 0);

export { client, db, orm, schema };
