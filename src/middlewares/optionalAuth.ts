import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      const payload = verifyToken(header.slice(7).trim());
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      // token invalido: segue como visitante
    }
  }
  next();
}
