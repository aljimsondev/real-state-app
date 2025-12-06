'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { createClient } from '@/core/supabase/client';
import {
  SignupFormData,
  signupFormSchema,
} from '@/lib/form-schema/signup-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import SocialAuthProviders from './social-auth';

function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'all',
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });

  const handleRegistration = async (data: SignupFormData) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    router.push('/setup-account'); // redirect to profile page
  };

  return (
    <Card className="min-w-[500px]">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create an Account
          </CardTitle>
          <Typography>Enter your email below to create your account</Typography>
        </CardHeader>
        <form
          className="space-y-4 mt-6"
          method="POST"
          onSubmit={form.handleSubmit(handleRegistration)}
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex. juan_dela_cruz@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Create an Account
            </Button>
            <div className="mt-4 w-full flex items-center justify-center text-center">
              Or <br />
              Continue using
            </div>
            <SocialAuthProviders />
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
