import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

/**
 * Autenticacao opcional: se houver um JWT valido no header, injeta o usuario
 * em req.user; caso contrario, apenas segue adiante (sem bloquear).
 * Usado em rotas publicas que mostram estado personalizado quando logado
 * (ex.: se o usuario ja curtiu/salvou o artigo).
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      const payload = verifyToken(header.slice(7).trim());
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      // token invalido em rota opcional -> ignora e segue como visitante
    }
  }
  next();
}
