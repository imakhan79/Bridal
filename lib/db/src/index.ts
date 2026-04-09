import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const supabaseHost = "aws-1-ap-southeast-1.pooler.supabase.com";
const isSupabasePooler = databaseUrl.includes(supabaseHost);

let pool: pg.Pool;

if (isSupabasePooler) {
  const url = new URL(databaseUrl);
  pool = new Pool({
    host: url.hostname,
    port: Number(url.port) || 6543,
    database: url.pathname.slice(1),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({ connectionString: databaseUrl });
}

export { pool };
export const db = drizzle(pool, { schema });

export * from "./schema";
