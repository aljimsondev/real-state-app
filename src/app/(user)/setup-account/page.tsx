'use client';

import DropZone from '@/components/Dropzone';
import Stepper, { Step } from '@/components/Stepper';
import { FieldGroup } from '@/components/ui/field';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { createClient } from '@/core/supabase/client';
import {
  AccountSetupFormData,
  accountSetupFormSchema,
} from '@/lib/form-schema/account-setup-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SetupAccount() {
  const form = useForm({
    resolver: zodResolver(accountSetupFormSchema),
    mode: 'all',
    defaultValues: {
      full_name: '',
      phone: '',
      bio: '',
      avatar_url: '',
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const onSubmit = async (data: AccountSetupFormData) => {
    try {
      // validate data making sure that the data follows the zod validation
      const safeParsedData = accountSetupFormSchema.parse(data);

      // instantiate the supabase
      const supabase = createClient();
      if (files.length > 0) {
        // todo upload file
        const file = files[0] as any;
        console.log(file);
        const buckets = await supabase.storage.listBuckets();
        const user = await supabase.auth.getClaims();
        return console.log(user);
        const result = await supabase.storage
          .from('profile_pictures')
          .upload(file.name, file);

        console.log(result);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const basicInfoCompleted =
    form.watch('full_name') &&
    form.watch('phone') &&
    !form.getFieldState('full_name').error &&
    !form.getFieldState('phone').error;

  const disableNextStep = !basicInfoCompleted;

  return (
    <main className="container mx-auto flex items-center justify-center h-[100dvh] flex-col">
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-full md:min-w-[500px] relative"
      >
        <Form {...form}>
          <Stepper
            initialStep={1}
            onFinalStepCompleted={async () =>
              console.log('All steps completed!')
            }
            backButtonText="Previous"
            nextButtonText="Next"
            nextButtonProps={{
              disabled: disableNextStep,
            }}
            stepCircleContainerClassName="border-border border-[1px]"
            disableStepIndicators
            contentClassName="h-fit"
          >
            <Step>
              <FieldGroup className="py-8 min-h-[400px]">
                <div>
                  <Typography className="text-primary">
                    Basic Information
                  </Typography>
                  <Typography variant="subtitle1">
                    Add your basic information to get started!
                  </Typography>
                </div>
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} style={{ resize: 'none' }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
            </Step>
            <Step>
              <FieldGroup className="py-8 min-h-[400px]">
                <div>
                  <Typography className="text-primary">
                    Profile Photo
                  </Typography>
                  <Typography variant="subtitle1">
                    Upload your profile picture
                  </Typography>
                </div>
                <div>
                  <DropZone
                    files={files}
                    onDropAccepted={(files) => {
                      setFiles(files);
                    }}
                    showPreview
                  />
                </div>
              </FieldGroup>
            </Step>
          </Stepper>
        </Form>
      </form>
    </main>
  );
}

export default SetupAccount;
