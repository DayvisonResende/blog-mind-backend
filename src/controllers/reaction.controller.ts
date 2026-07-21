import { Request, Response } from 'express';
import { ReactionService, reactionService } from '../services/reaction.service';
import { NewsletterService, newsletterService } from '../services/newsletter.service';
import { subscribeSchema } from '../dtos/newsletter.dto';
import { AppError } from '../utils/AppError';

export class ReactionController {
  constructor(
    private readonly reactions: ReactionService = reactionService,
    private readonly newsletter: NewsletterService = newsletterService,
  ) {}

  private param(req: Request, key: string): string {
    const value = req.params[key];
    return Array.isArray(value) ? value[0] : value;
  }

  private userId(req: Request): string {
    if (!req.user) throw new AppError('Nao autenticado', 401, 'UNAUTHORIZED');
    return req.user.id;
  }

  likeArticle = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.reactions.toggleArticleLike(this.param(req, 'id'), this.userId(req)));
  };

  saveArticle = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.reactions.toggleArticleSave(this.param(req, 'id'), this.userId(req)));
  };

  likeComment = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.reactions.toggleCommentLike(this.param(req, 'id'), this.userId(req)));
  };

  subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
    const { email } = subscribeSchema.parse(req.body);
    res.status(201).json(await this.newsletter.subscribe(email));
  };
}

export const reactionController = new ReactionController();
