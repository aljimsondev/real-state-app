import { createBrowserClient } from '@supabase/ssr';
console.log(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!);
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
