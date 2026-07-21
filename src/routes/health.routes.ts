import { Router, Request, Response } from 'express';

const healthRoutes = Router();

/**
 * GET /health - verificacao de saude da API.
 */
healthRoutes.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { healthRoutes };
