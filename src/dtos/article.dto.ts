import { z } from 'zod';

// No multipart as tags chegam como texto: aceita JSON de array ou lista separada por virgula.
const tagsSchema = z
  .preprocess((value) => {
    if (value == null || value === '') return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.startsWith('[')) {
        try {
          return JSON.parse(trimmed);
        } catch {
          return [];
        }
      }
      return trimmed.split(',');
    }
    return [];
  }, z.array(z.string().trim().min(1).max(60)))
  .transform((tags) => [...new Set(tags.map((t) => t.trim()).filter(Boolean))]);

export const createArticleSchema = z.object({
  title: z.string().trim().min(3, 'Título muito curto').max(200),
  summary: z.string().trim().min(3, 'Resumo muito curto').max(120),
  content: z.string().trim().min(1, 'Conteúdo é obrigatório'),
  category: z.string().trim().min(1, 'Categoria é obrigatória').max(80),
  tags: tagsSchema.optional().default([]),
});

export const updateArticleSchema = createArticleSchema.partial();

export const listArticlesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ListArticlesQuery = z.infer<typeof listArticlesQuerySchema>;
