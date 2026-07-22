import { CommentRepository, commentRepository } from '../repositories/comment.repository';
import { ArticleRepository, articleRepository } from '../repositories/article.repository';
import { toCommentResponse, CommentResponse } from '../dtos/comment.dto';
import { sanitizeText } from '../utils/sanitize';
import { AppError } from '../utils/AppError';

export class CommentService {
  constructor(
    private readonly comments: CommentRepository = commentRepository,
    private readonly articles: ArticleRepository = articleRepository,
  ) {}

  async recentActivity(authorId: string) {
    const comments = await this.comments.recentForAuthorArticles(authorId);
    return comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      commenter: { name: c.author.name, avatar: c.author.avatar },
      article: { id: c.article.id, title: c.article.title },
    }));
  }

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
    if (!content) throw new AppError('Comentário inválido', 422, 'INVALID_COMMENT');

    const comment = await this.comments.create(articleId, authorId, content);
    return toCommentResponse(comment);
  }

  async delete(id: string, userId: string): Promise<void> {
    const owner = await this.comments.findOwner(id);
    if (!owner) throw new AppError('Comentário não encontrado', 404, 'COMMENT_NOT_FOUND');
    if (owner.authorId !== userId) {
      throw new AppError('Você não tem permissão para esta ação', 403, 'FORBIDDEN');
    }
    await this.comments.delete(id);
  }

  private async assertArticleExists(articleId: string): Promise<void> {
    const article = await this.articles.findOwner(articleId);
    if (!article) throw new AppError('Artigo não encontrado', 404, 'ARTICLE_NOT_FOUND');
  }
}

export const commentService = new CommentService();
