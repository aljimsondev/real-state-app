'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Typography } from '@/components/ui/typography';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/core/supabase/client';
import {
  SignupFormData,
  signupFormSchema,
} from '@/lib/form-schema/signup-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'all',
  });

  const handleRegistration = async (data: SignupFormData) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { emailRedirectTo: `${window.location.origin}/confirm-account` },
    });

    if (error) throw error;
    router.push('/auth/sign-up-success');
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
            <Button className="w-full">Create an Account</Button>
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
