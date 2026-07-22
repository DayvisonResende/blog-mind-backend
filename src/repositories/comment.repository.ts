import { prisma } from '../config/prisma';
import { commentInclude, CommentWithRelations } from '../dtos/comment.dto';

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

  recentForAuthorArticles(authorId: string, limit = 5) {
    return prisma.comment.findMany({
      where: { article: { authorId } },
      include: {
        author: { select: { name: true, avatar: true } },
        article: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

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
