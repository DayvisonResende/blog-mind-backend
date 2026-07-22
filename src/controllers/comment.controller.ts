import { Request, Response } from 'express';
import { CommentService, commentService } from '../services/comment.service';
import { createCommentSchema } from '../dtos/comment.dto';
import { AppError } from '../utils/AppError';

export class CommentController {
  constructor(private readonly comments: CommentService = commentService) {}

  private param(req: Request, key: string): string {
    const value = req.params[key];
    return Array.isArray(value) ? value[0] : value;
  }

  private userId(req: Request): string {
    if (!req.user) throw new AppError('Não autenticado', 401, 'UNAUTHORIZED');
    return req.user.id;
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const comments = await this.comments.listByArticle(this.param(req, 'id'), req.user?.id);
    res.json(comments);
  };

  recentActivity = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.comments.recentActivity(this.userId(req)));
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { content } = createCommentSchema.parse(req.body);
    const comment = await this.comments.create(this.param(req, 'id'), this.userId(req), content);
    res.status(201).json(comment);
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    await this.comments.delete(this.param(req, 'id'), this.userId(req));
    res.status(204).send();
  };
}

export const commentController = new CommentController();
