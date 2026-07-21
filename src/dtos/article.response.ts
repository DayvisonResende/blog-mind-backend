import type { Prisma } from '@prisma/client';

/**
 * Include padrao usado ao buscar artigos: traz o autor (dados publicos),
 * as tags e as contagens de curtidas e comentarios.
 */
export const articleInclude = {
  author: { select: { id: true, name: true, avatar: true } },
  tags: { include: { tag: true } },
  _count: { select: { likes: true, comments: true } },
} satisfies Prisma.ArticleInclude;

/** Tipo do artigo do Prisma ja com o include acima aplicado. */
export type ArticleWithRelations = Prisma.ArticleGetPayload<{ include: typeof articleInclude }>;

export interface ArticleAuthor {
  id: string;
  name: string;
  avatar: string | null;
}

export interface ArticleResponse {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  readingTime: number;
  views: number;
  likesCount: number;
  commentsCount: number;
  author: ArticleAuthor;
  createdAt: Date;
  updatedAt: Date;
}

/** Converte o artigo do Prisma no formato de resposta da API. */
export function toArticleResponse(article: ArticleWithRelations): ArticleResponse {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    content: article.content,
    coverImage: article.coverImage,
    category: article.category,
    tags: article.tags.map((t) => t.tag.name),
    readingTime: article.readingTime,
    views: article.views,
    likesCount: article._count.likes,
    commentsCount: article._count.comments,
    author: article.author,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}
