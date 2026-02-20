import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { user, session, account } from "./auth-schema";

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (db) return db;

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) throw new Error("DATABASE_URL is missing");

  const isLocal = DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");

  const client = postgres(DATABASE_URL, {
    max: 1,
    prepare: false,
    ssl: isLocal ? false : "require",
    idle_timeout: 20,
    connect_timeout: 10,
  });

  db = drizzle(client, { schema });
  return db;
}

export { todos } from "./schema";
export { users } from "./schema";
export { user, account, session };