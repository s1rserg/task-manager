import { z } from 'zod';

export const userSignUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export const userSignInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
