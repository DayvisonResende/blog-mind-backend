import { z } from 'zod';
import type { User } from '@prisma/client';

/**
 * Validacao da atualizacao de perfil (campos de texto).
 * A foto de perfil e enviada como arquivo (multipart) e tratada a parte.
 */
export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    bio: z.string().max(500).nullable().optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/** Formato seguro do usuario retornado pela API (sem a senha). */
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response DTO: converte a entidade User em um objeto seguro,
 * removendo o campo `password` antes de enviar na resposta.
 */
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
