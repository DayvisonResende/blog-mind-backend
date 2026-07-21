import { Router } from 'express';
import { healthRoutes } from './health.routes';

/**
 * Agregador de rotas da API.
 * Cada modulo (auth, articles, comments...) registra suas rotas aqui
 * ao longo das proximas fases.
 */
const routes = Router();

routes.use(healthRoutes);

export { routes };
