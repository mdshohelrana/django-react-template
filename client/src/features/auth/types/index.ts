import { z } from 'zod';

import { AuthUser } from '@/types';
import { validateEmail } from '@/utils/validation';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((value) => validateEmail(value), 'Invalid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
});

export const registerSchema = z.object({
  first_name: z.string().refine((value) => value.trim().length > 0, 'First name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((value) => validateEmail(value), 'Invalid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSuccess: () => void;
};

export type RegisterValues = {
  first_name: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  onSuccess: () => void;
};

export type UserResponse = {
  access: string;
  user: AuthUser;
};
