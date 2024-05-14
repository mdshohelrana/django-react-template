import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password must contain at least 6 characters'),
    newPassword: z.string().min(6, 'New password must contain at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirmation password must contain at least 6 characters'),
  })
  .refine((schema) => schema.newPassword === schema.confirmPassword, {
    message: 'Make sure you re-typed password correctly',
    path: ['confirmPassword'],
  });

export type Password = z.infer<typeof passwordSchema>;

export type PasswordDTO = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};
