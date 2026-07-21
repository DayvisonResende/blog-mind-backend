import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

/**
 * Middleware factory que valida o corpo da requisicao contra um schema Zod.
 * Em caso de erro, o ZodError e repassado ao tratamento central (422).
 * Em caso de sucesso, substitui req.body pelos dados ja parseados/tipados.
 */
export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}
