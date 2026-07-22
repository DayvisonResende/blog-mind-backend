import { ReactionRepository, reactionRepository } from '../repositories/reaction.repository';
import { ArticleRepository, articleRepository } from '../repositories/article.repository';
import { CommentRepository, commentRepository } from '../repositories/comment.repository';
import { AppError } from '../utils/AppError';

/**
 * Regras de negocio das reacoes (toggle): curtir artigo/comentario e salvar
 * artigo. Cada operacao valida a existencia do alvo antes de alternar.
 */
export class ReactionService {
  constructor(
    private readonly reactions: ReactionRepository = reactionRepository,
    private readonly articles: ArticleRepository = articleRepository,
    private readonly comments: CommentRepository = commentRepository,
  ) {}

  async toggleArticleLike(articleId: string, userId: string) {
    await this.assertArticleExists(articleId);
    return this.reactions.toggleArticleLike(articleId, userId);
  }

  async toggleArticleSave(articleId: string, userId: string) {
    await this.assertArticleExists(articleId);
    return this.reactions.toggleArticleSave(articleId, userId);
  }

  async toggleCommentLike(commentId: string, userId: string) {
    const comment = await this.comments.findOwner(commentId);
    if (!comment) throw new AppError('Comentário não encontrado', 404, 'COMMENT_NOT_FOUND');
    return this.reactions.toggleCommentLike(commentId, userId);
  }

  private async assertArticleExists(articleId: string): Promise<void> {
    const article = await this.articles.findOwner(articleId);
    if (!article) throw new AppError('Artigo não encontrado', 404, 'ARTICLE_NOT_FOUND');
  }
}

export const reactionService = new ReactionService();
