import { CommentRepository, commentRepository } from '../repositories/comment.repository';
import { ArticleRepository, articleRepository } from '../repositories/article.repository';
import { toCommentResponse, CommentResponse } from '../dtos/comment.dto';
import { sanitizeText } from '../utils/sanitize';
import { AppError } from '../utils/AppError';

/**
 * Regras de negocio dos comentarios: listar (com estado de curtida do usuario),
 * criar (sanitizado contra XSS) e remover (apenas o autor).
 */
export class CommentService {
  constructor(
    private readonly comments: CommentRepository = commentRepository,
    private readonly articles: ArticleRepository = articleRepository,
  ) {}

  async listByArticle(articleId: string, currentUserId?: string): Promise<CommentResponse[]> {
    await this.assertArticleExists(articleId);
    const items = await this.comments.listByArticle(articleId);

    const likedIds = currentUserId
      ? await this.comments.likedIdsForUser(
          currentUserId,
          items.map((c) => c.id),
        )
      : new Set<string>();

    return items.map((c) => toCommentResponse(c, likedIds));
  }

  async create(articleId: string, authorId: string, rawContent: string): Promise<CommentResponse> {
    await this.assertArticleExists(articleId);

    const content = sanitizeText(rawContent);
    if (!content) throw new AppError('Comentario invalido', 422, 'INVALID_COMMENT');

    const comment = await this.comments.create(articleId, authorId, content);
    return toCommentResponse(comment);
  }

  async delete(id: string, userId: string): Promise<void> {
    const owner = await this.comments.findOwner(id);
    if (!owner) throw new AppError('Comentario nao encontrado', 404, 'COMMENT_NOT_FOUND');
    if (owner.authorId !== userId) {
      throw new AppError('Voce nao tem permissao para esta acao', 403, 'FORBIDDEN');
    }
    await this.comments.delete(id);
  }

  private async assertArticleExists(articleId: string): Promise<void> {
    const article = await this.articles.findOwner(articleId);
    if (!article) throw new AppError('Artigo nao encontrado', 404, 'ARTICLE_NOT_FOUND');
  }
}

export const commentService = new CommentService();
