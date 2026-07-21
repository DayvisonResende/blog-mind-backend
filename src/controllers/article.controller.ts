import { Request, Response } from 'express';
import { ArticleService, articleService } from '../services/article.service';
import {
  createArticleSchema,
  updateArticleSchema,
  listArticlesQuerySchema,
} from '../dtos/article.dto';
import { AppError } from '../utils/AppError';

/**
 * Controller de artigos. A validacao dos corpos multipart acontece aqui
 * (apos o multer), pois os campos de texto so existem depois do parse.
 */
export class ArticleController {
  constructor(private readonly articles: ArticleService = articleService) {}

  private userId(req: Request): string {
    if (!req.user) throw new AppError('Nao autenticado', 401, 'UNAUTHORIZED');
    return req.user.id;
  }

  /** Le o parametro :id garantindo que seja uma string simples. */
  private articleId(req: Request): string {
    const { id } = req.params;
    return Array.isArray(id) ? id[0] : id;
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const query = listArticlesQuerySchema.parse(req.query);
    res.json(await this.articles.list(query));
  };

  categories = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.articles.categories());
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.articles.getByIdAndCountView(this.articleId(req)));
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createArticleSchema.parse(req.body);
    const article = await this.articles.create(this.userId(req), input, req.file?.buffer);
    res.status(201).json(article);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const input = updateArticleSchema.parse(req.body);
    const article = await this.articles.update(
      this.articleId(req),
      this.userId(req),
      input,
      req.file?.buffer,
    );
    res.json(article);
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    await this.articles.delete(this.articleId(req), this.userId(req));
    res.status(204).send();
  };

  mine = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.articles.listMine(this.userId(req)));
  };

  dashboardStats = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.articles.dashboardStats(this.userId(req)));
  };
}

export const articleController = new ArticleController();
