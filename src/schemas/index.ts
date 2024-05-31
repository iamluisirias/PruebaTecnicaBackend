import { z } from 'zod';

export const validateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateCollaboratorSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  job: z.string(),
  // id: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
