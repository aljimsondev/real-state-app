import { z } from 'zod';

export const accountSetupFormSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .trim(),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      'Please enter a valid phone number',
    )
    .trim(),

  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  avatar_url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),

  company_name: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  license_number: z
    .string()
    .min(3, 'License number must be at least 3 characters')
    .max(50, 'License number must not exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'License number can only contain letters, numbers, and hyphens',
    )
    .trim()
    .optional()
    .or(z.literal('')),
});

// Type export
export type AccountSetupFormData = z.infer<typeof accountSetupFormSchema>;
