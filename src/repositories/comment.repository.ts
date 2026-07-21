import { prisma } from '../config/prisma';
import { commentInclude, CommentWithRelations } from '../dtos/comment.dto';

/** Acesso a dados dos comentarios. */
export class CommentRepository {
  listByArticle(articleId: string): Promise<CommentWithRelations[]> {
    return prisma.comment.findMany({
      where: { articleId },
      include: commentInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  create(articleId: string, authorId: string, content: string): Promise<CommentWithRelations> {
    return prisma.comment.create({
      data: { articleId, authorId, content },
      include: commentInclude,
    });
  }

  findOwner(id: string): Promise<{ authorId: string } | null> {
    return prisma.comment.findUnique({ where: { id }, select: { authorId: true } });
  }

  delete(id: string): Promise<unknown> {
    return prisma.comment.delete({ where: { id } });
  }

  /** Ids (dentre os informados) que o usuario curtiu — define o campo `liked`. */
  async likedIdsForUser(userId: string, commentIds: string[]): Promise<Set<string>> {
    if (commentIds.length === 0) return new Set();
    const rows = await prisma.commentLike.findMany({
      where: { userId, commentId: { in: commentIds } },
      select: { commentId: true },
    });
    return new Set(rows.map((r) => r.commentId));
  }
}

export const commentRepository = new CommentRepository();
