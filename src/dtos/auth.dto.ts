import { z } from 'zod';

/** Validacao do cadastro. */
export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter ao menos 2 caracteres').max(120),
  email: z.email('E-mail inválido').max(160),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres').max(100),
});

/** Validacao do login. */
export const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
