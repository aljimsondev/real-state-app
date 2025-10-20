import { createClient } from '@/core/supabase/server';

async function ProfilePage() {
  const supabase = await createClient();

  return <div>ProfilePage</div>;
}

export default ProfilePage;
