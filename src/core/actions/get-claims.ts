'use server';

import { createClient } from '@/core/supabase/server';

export const getClaims = async () => {
  const client = await createClient();
  const claims = await client.auth.getClaims();

  return claims;
};
