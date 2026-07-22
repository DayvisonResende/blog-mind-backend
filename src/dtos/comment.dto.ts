import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const createCommentSchema = z.object({
  content: z.string().trim().min(1, 'Comentário não pode ser vazio').max(1000),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

/** Include padrao ao buscar comentarios: autor + contagem de curtidas. */
export const commentInclude = {
  author: { select: { id: true, name: true, avatar: true } },
  _count: { select: { likes: true } },
} satisfies Prisma.CommentInclude;

export type CommentWithRelations = Prisma.CommentGetPayload<{ include: typeof commentInclude }>;

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: Date;
  author: { id: string; name: string; avatar: string | null };
  likesCount: number;
  liked: boolean;
}

/**
 * Converte o comentario do Prisma na resposta da API.
 * `likedIds` e o conjunto de ids de comentarios curtidos pelo usuario atual
 * (vazio para visitantes) — define o campo `liked`.
 */
export function toCommentResponse(
  comment: CommentWithRelations,
  likedIds: Set<string> = new Set(),
): CommentResponse {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    author: comment.author,
    likesCount: comment._count.likes,
    liked: likedIds.has(comment.id),
  };
}
