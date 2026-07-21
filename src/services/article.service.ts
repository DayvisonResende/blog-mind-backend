import { ArticleRepository, articleRepository } from '../repositories/article.repository';
import { ReactionRepository, reactionRepository } from '../repositories/reaction.repository';
import { toArticleResponse, ArticleResponse } from '../dtos/article.response';
import { CreateArticleInput, UpdateArticleInput, ListArticlesQuery } from '../dtos/article.dto';
import { calculateReadingTime } from '../utils/readingTime';
import { saveCoverImage, deleteCoverImage } from '../utils/image';
import { AppError } from '../utils/AppError';

interface PaginatedArticles {
  items: ArticleResponse[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

/**
 * Regras de negocio dos artigos: CRUD, autorizacao (so o autor edita/exclui),
 * calculo do tempo de leitura, upload da capa e estatisticas do dashboard.
 */
export class ArticleService {
  constructor(
    private readonly articles: ArticleRepository = articleRepository,
    private readonly reactions: ReactionRepository = reactionRepository,
  ) {}

  async list(query: ListArticlesQuery): Promise<PaginatedArticles> {
    const { items, total } = await this.articles.list(query);
    return {
      items: items.map((a) => toArticleResponse(a)),
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.limit)),
      },
    };
  }

  /** Detalhe do artigo; incrementa as visualizacoes a cada acesso. */
  async getByIdAndCountView(id: string, currentUserId?: string): Promise<ArticleResponse> {
    const existing = await this.articles.findById(id);
    if (!existing) throw new AppError('Artigo nao encontrado', 404, 'ARTICLE_NOT_FOUND');

    await this.articles.incrementViews(id);

    const viewer = currentUserId
      ? {
          isLiked: await this.reactions.isArticleLikedBy(id, currentUserId),
          isSaved: await this.reactions.isArticleSavedBy(id, currentUserId),
        }
      : {};

    return toArticleResponse({ ...existing, views: existing.views + 1 }, viewer);
  }

  async create(
    authorId: string,
    input: CreateArticleInput,
    coverBuffer?: Buffer,
  ): Promise<ArticleResponse> {
    const coverImage = coverBuffer ? await saveCoverImage(coverBuffer) : null;
    const article = await this.articles.create({
      title: input.title,
      summary: input.summary,
      content: input.content,
      category: input.category,
      coverImage,
      readingTime: calculateReadingTime(input.content),
      authorId,
      tags: input.tags ?? [],
    });
    return toArticleResponse(article);
  }

  async update(
    id: string,
    userId: string,
    input: UpdateArticleInput,
    coverBuffer?: Buffer,
  ): Promise<ArticleResponse> {
    const owner = await this.assertOwner(id, userId);

    let coverImage: string | undefined;
    if (coverBuffer) {
      coverImage = await saveCoverImage(coverBuffer);
      await deleteCoverImage(owner.coverImage); // remove a capa antiga
    }

    const article = await this.articles.update(id, {
      ...input,
      ...(coverImage ? { coverImage } : {}),
      ...(input.content ? { readingTime: calculateReadingTime(input.content) } : {}),
    });
    return toArticleResponse(article);
  }

  async delete(id: string, userId: string): Promise<void> {
    const owner = await this.assertOwner(id, userId);
    await this.articles.delete(id);
    await deleteCoverImage(owner.coverImage);
  }

  async listMine(authorId: string): Promise<ArticleResponse[]> {
    const items = await this.articles.listByAuthor(authorId);
    return items.map((a) => toArticleResponse(a));
  }

  dashboardStats(authorId: string) {
    return this.articles.authorStats(authorId);
  }

  categories(): Promise<string[]> {
    return this.articles.distinctCategories();
  }

  /** Garante que o artigo existe e pertence ao usuario; senao lanca 404/403. */
  private async assertOwner(id: string, userId: string) {
    const owner = await this.articles.findOwner(id);
    if (!owner) throw new AppError('Artigo nao encontrado', 404, 'ARTICLE_NOT_FOUND');
    if (owner.authorId !== userId) {
      throw new AppError('Voce nao tem permissao para esta acao', 403, 'FORBIDDEN');
    }
    return owner;
  }
}

export const articleService = new ArticleService();
