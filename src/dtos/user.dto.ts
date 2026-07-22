import { z } from 'zod';
import type { User } from '@prisma/client';

// A foto de perfil vem como arquivo (multipart), tratada a parte.
export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    bio: z.string().max(500).nullable().optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

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

// Nunca expoe o campo password.
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
