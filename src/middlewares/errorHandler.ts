import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

/**
 * Middleware central de tratamento de erros.
 * Padroniza todas as respostas de erro no formato { message, code }
 * com o status HTTP correto. Deve ser registrado por ultimo no app.
 *
 * Em Express 5, erros lancados em handlers async chegam aqui automaticamente.
 * A assinatura de 4 parametros (err, req, res, next) e obrigatoria para o
 * Express reconhecer este middleware como handler de erros.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  // Erros de negocio previstos
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message, code: err.code });
    return;
  }

  // Erros de validacao do Zod
  if (err instanceof ZodError) {
    res.status(422).json({
      message: 'Dados invalidos',
      code: 'VALIDATION_ERROR',
      issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    });
    return;
  }

  // Erro inesperado: loga no servidor, mas nao vaza detalhes ao cliente
  console.error('[ERRO NAO TRATADO]', err);
  res.status(500).json({
    message: 'Erro interno do servidor',
    code: 'INTERNAL_SERVER_ERROR',
    ...(env.NODE_ENV === 'development' && err instanceof Error ? { detail: err.message } : {}),
  });
}

/**
 * Fallback para rotas inexistentes (404).
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    message: `Rota nao encontrada: ${req.method} ${req.originalUrl}`,
    code: 'ROUTE_NOT_FOUND',
  });
}
