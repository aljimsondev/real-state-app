import { Button } from '@/components/ui/button';
import { createClient } from '@/core/supabase/client';
import { toast } from '@/lib/utils/toast';
import Image from 'next/image';

function SocialAuthProviders() {
  const supabase = createClient();

  const signinWithSocialProvider = (provider: 'google' | 'github') => {
    return supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signinWithSocialProvider('google');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e?.message);
      }
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <Button
        className="p-1 h-fit aspect-square rounded-full relative flex items-center justify-center"
        variant="outline"
        type="button"
        onClick={handleGoogleSignin}
      >
        <div className="h-10 w-10 relative">
          <Image alt="google" src="/google.png" fill />
        </div>
      </Button>
    </div>
  );
}

export default SocialAuthProviders;
