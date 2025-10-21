import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/core/database/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
  schemaFilter: ['public'], // Only manage public schema, ignore auth since supabase already have this schema built-in
});
