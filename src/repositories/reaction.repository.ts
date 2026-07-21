import { prisma } from '../config/prisma';

interface ToggleResult {
  active: boolean;
  count: number;
}

/**
 * Acesso a dados das reacoes (toggle): curtir artigo, curtir comentario e
 * salvar artigo. Cada operacao cria o vinculo se nao existir ou remove se
 * ja existir, respeitando a restricao unica por (alvo, usuario).
 */
export class ReactionRepository {
  async toggleArticleLike(articleId: string, userId: string): Promise<ToggleResult> {
    const existing = await prisma.articleLike.findUnique({
      where: { articleId_userId: { articleId, userId } },
    });
    if (existing) {
      await prisma.articleLike.delete({ where: { id: existing.id } });
    } else {
      await prisma.articleLike.create({ data: { articleId, userId } });
    }
    const count = await prisma.articleLike.count({ where: { articleId } });
    return { active: !existing, count };
  }

  async toggleCommentLike(commentId: string, userId: string): Promise<ToggleResult> {
    const existing = await prisma.commentLike.findUnique({
      where: { commentId_userId: { commentId, userId } },
    });
    if (existing) {
      await prisma.commentLike.delete({ where: { id: existing.id } });
    } else {
      await prisma.commentLike.create({ data: { commentId, userId } });
    }
    const count = await prisma.commentLike.count({ where: { commentId } });
    return { active: !existing, count };
  }

  async toggleArticleSave(articleId: string, userId: string): Promise<{ active: boolean }> {
    const existing = await prisma.articleSave.findUnique({
      where: { articleId_userId: { articleId, userId } },
    });
    if (existing) {
      await prisma.articleSave.delete({ where: { id: existing.id } });
    } else {
      await prisma.articleSave.create({ data: { articleId, userId } });
    }
    return { active: !existing };
  }

  async isArticleLikedBy(articleId: string, userId: string): Promise<boolean> {
    const like = await prisma.articleLike.findUnique({
      where: { articleId_userId: { articleId, userId } },
      select: { id: true },
    });
    return like !== null;
  }

  async isArticleSavedBy(articleId: string, userId: string): Promise<boolean> {
    const save = await prisma.articleSave.findUnique({
      where: { articleId_userId: { articleId, userId } },
      select: { id: true },
    });
    return save !== null;
  }
}

export const reactionRepository = new ReactionRepository();
