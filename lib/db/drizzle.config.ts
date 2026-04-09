import { defineConfig } from "drizzle-kit";
import path from "path";

const supabasePassword = process.env.SUPABASE_DB_PASSWORD;
const databaseUrl = process.env.DATABASE_URL;

if (!supabasePassword && !databaseUrl) {
  throw new Error("DATABASE_URL or SUPABASE_DB_PASSWORD must be set");
}

const dbCredentials = supabasePassword
  ? {
      host: "aws-1-ap-southeast-1.pooler.supabase.com",
      port: 6543,
      database: "postgres",
      user: "postgres.ilfnlwnsuwkjaunhyuzw",
      password: supabasePassword,
      ssl: { rejectUnauthorized: false },
    }
  : { url: databaseUrl! };

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials,
});
