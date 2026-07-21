import { Router } from 'express';
import { commentController } from '../controllers/comment.controller';
import { reactionController } from '../controllers/reaction.controller';
import { authenticate } from '../middlewares/authenticate';
import { optionalAuth } from '../middlewares/optionalAuth';
import { validateBody } from '../middlewares/validate';
import { createCommentSchema } from '../dtos/comment.dto';
import { subscribeSchema } from '../dtos/newsletter.dto';

const engagementRoutes = Router();

// Comentarios
engagementRoutes.get('/articles/:id/comments', optionalAuth, commentController.list);
engagementRoutes.post(
  '/articles/:id/comments',
  authenticate,
  validateBody(createCommentSchema),
  commentController.create,
);
engagementRoutes.delete('/comments/:id', authenticate, commentController.remove);

// Curtidas e salvar (toggle)
engagementRoutes.post('/articles/:id/like', authenticate, reactionController.likeArticle);
engagementRoutes.post('/articles/:id/save', authenticate, reactionController.saveArticle);
engagementRoutes.post('/comments/:id/like', authenticate, reactionController.likeComment);

// Newsletter
engagementRoutes.post(
  '/newsletter/subscribe',
  validateBody(subscribeSchema),
  reactionController.subscribeNewsletter,
);

export { engagementRoutes };
