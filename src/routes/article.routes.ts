import { Router } from 'express';
import { articleController } from '../controllers/article.controller';
import { authenticate } from '../middlewares/authenticate';
import { uploadCover } from '../middlewares/upload';

const articleRoutes = Router();

// Publicas
articleRoutes.get('/articles', articleController.list);
articleRoutes.get('/categories', articleController.categories);

// Protegidas especificas (antes de /articles/:id nao ha conflito por serem outros paths)
articleRoutes.get('/users/me/articles', authenticate, articleController.mine);
articleRoutes.get('/dashboard/stats', authenticate, articleController.dashboardStats);

// Detalhe publico (incrementa views)
articleRoutes.get('/articles/:id', articleController.getById);

// Escrita (protegida; multipart com a capa)
articleRoutes.post('/articles', authenticate, uploadCover, articleController.create);
articleRoutes.put('/articles/:id', authenticate, uploadCover, articleController.update);
articleRoutes.delete('/articles/:id', authenticate, articleController.remove);

export { articleRoutes };
