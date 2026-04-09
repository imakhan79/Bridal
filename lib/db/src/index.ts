import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;
const supabasePassword = process.env.SUPABASE_DB_PASSWORD;

if (!databaseUrl && !supabasePassword) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

let pool: pg.Pool;

if (supabasePassword) {
  pool = new Pool({
    host: "aws-1-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    database: "postgres",
    user: "postgres.ilfnlwnsuwkjaunhyuzw",
    password: supabasePassword,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({ connectionString: databaseUrl! });
}

export { pool };
export const db = drizzle(pool, { schema });

export * from "./schema";
