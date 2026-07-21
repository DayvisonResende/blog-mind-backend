import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { articleRoutes } from './article.routes';
import { engagementRoutes } from './engagement.routes';

/**
 * Agregador de rotas da API.
 * Cada modulo (auth, articles, comments...) registra suas rotas aqui
 * ao longo das proximas fases.
 */
const routes = Router();

routes.use(healthRoutes);
routes.use(authRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);
routes.use(engagementRoutes);

export { routes };
