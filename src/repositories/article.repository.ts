import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { articleInclude, ArticleWithRelations } from '../dtos/article.response';

interface ListParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

interface CreateData {
  title: string;
  summary: string;
  content: string;
  category: string;
  coverImage: string | null;
  readingTime: number;
  authorId: string;
  tags: string[];
}

/**
 * Camada de acesso a dados dos artigos.
 * Encapsula as queries do Prisma, incluindo a associacao N:N com tags.
 */
export class ArticleRepository {
  /** Monta o filtro de busca (titulo ou nome do autor) e categoria. */
  private buildWhere(search?: string, category?: string): Prisma.ArticleWhereInput {
    const where: Prisma.ArticleWhereInput = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { author: { is: { name: { contains: search } } } },
      ];
    }
    return where;
  }

  async list({ page, limit, search, category }: ListParams): Promise<{
    items: ArticleWithRelations[];
    total: number;
  }> {
    const where = this.buildWhere(search, category);
    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: articleInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);
    return { items, total };
  }

  findById(id: string): Promise<ArticleWithRelations | null> {
    return prisma.article.findUnique({ where: { id }, include: articleInclude });
  }

  /** Retorna apenas o dono do artigo (para checagem de autorizacao). */
  findOwner(id: string): Promise<{ authorId: string; coverImage: string | null } | null> {
    return prisma.article.findUnique({
      where: { id },
      select: { authorId: true, coverImage: true },
    });
  }

  incrementViews(id: string): Promise<unknown> {
    return prisma.article.update({ where: { id }, data: { views: { increment: 1 } } });
  }

  async create(data: CreateData): Promise<ArticleWithRelations> {
    const { tags, ...rest } = data;
    const article = await prisma.article.create({
      data: {
        ...rest,
        tags: { create: await this.connectTags(tags) },
      },
      include: articleInclude,
    });
    return article;
  }

  async update(
    id: string,
    data: Partial<Omit<CreateData, 'authorId'>>,
  ): Promise<ArticleWithRelations> {
    const { tags, ...rest } = data;
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...rest,
        // Se tags vierem, substitui o conjunto atual.
        ...(tags
          ? { tags: { deleteMany: {}, create: await this.connectTags(tags) } }
          : {}),
      },
      include: articleInclude,
    });
    return article;
  }

  delete(id: string): Promise<unknown> {
    return prisma.article.delete({ where: { id } });
  }

  listByAuthor(authorId: string): Promise<ArticleWithRelations[]> {
    return prisma.article.findMany({
      where: { authorId },
      include: articleInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Estatisticas agregadas dos artigos de um autor (para o dashboard). */
  async authorStats(authorId: string): Promise<{
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    avgReadingTime: number;
  }> {
    const [agg, totalLikes, totalComments] = await Promise.all([
      prisma.article.aggregate({
        where: { authorId },
        _count: { _all: true },
        _sum: { views: true },
        _avg: { readingTime: true },
      }),
      prisma.articleLike.count({ where: { article: { authorId } } }),
      prisma.comment.count({ where: { article: { authorId } } }),
    ]);

    return {
      totalArticles: agg._count._all,
      totalViews: agg._sum.views ?? 0,
      totalLikes,
      totalComments,
      avgReadingTime: Math.round(agg._avg.readingTime ?? 0),
    };
  }

  /** Categorias distintas existentes (para o filtro da listagem). */
  async distinctCategories(): Promise<string[]> {
    const rows = await prisma.article.findMany({
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    });
    return rows.map((r) => r.category);
  }

  /** Garante a existencia das tags (upsert) e devolve os vinculos para o N:N. */
  private async connectTags(tags: string[]): Promise<Prisma.ArticleTagCreateWithoutArticleInput[]> {
    const links = await Promise.all(
      tags.map(async (name) => {
        const tag = await prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        });
        return { tag: { connect: { id: tag.id } } };
      }),
    );
    return links;
  }
}

export const articleRepository = new ArticleRepository();
