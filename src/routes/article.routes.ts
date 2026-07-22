import { Router } from 'express';
import { articleController } from '../controllers/article.controller';
import { authenticate } from '../middlewares/authenticate';
import { optionalAuth } from '../middlewares/optionalAuth';
import { uploadCover } from '../middlewares/upload';

const articleRoutes = Router();

articleRoutes.get('/articles', articleController.list);
articleRoutes.get('/categories', articleController.categories);

articleRoutes.get('/users/me/articles', authenticate, articleController.mine);
articleRoutes.get('/dashboard/stats', authenticate, articleController.dashboardStats);

articleRoutes.get('/articles/:id', optionalAuth, articleController.getById);

articleRoutes.post('/articles', authenticate, uploadCover, articleController.create);
articleRoutes.put('/articles/:id', authenticate, uploadCover, articleController.update);
articleRoutes.delete('/articles/:id', authenticate, articleController.remove);

export { articleRoutes };
