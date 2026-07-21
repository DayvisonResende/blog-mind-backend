import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

/**
 * Middleware de autenticacao: exige um JWT valido no header
 * `Authorization: Bearer <token>`, decodifica e injeta o usuario em req.user.
 * Bloqueia (401) qualquer requisicao sem token ou com token invalido/expirado.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Token nao fornecido', 401, 'UNAUTHORIZED');
  }

  const token = header.slice(7).trim();

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    throw new AppError('Token invalido ou expirado', 401, 'INVALID_TOKEN');
  }
}
