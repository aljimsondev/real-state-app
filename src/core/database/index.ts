import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export type PgDatabase = PostgresJsDatabase<Record<string, never>> & {
  $client: postgres.Sql<{}>;
};

const connectionString = process.env.SUPABASE_DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
