import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

/** Conteudo (payload) que guardamos dentro do token. */
export interface TokenPayload {
  sub: string; // id do usuario
  role: string;
}

/** Assina um JWT com o id e a role do usuario. */
export function signToken(payload: TokenPayload): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_SECRET, options);
}

/**
 * Verifica e decodifica um JWT. Lanca erro se invalido/expirado
 * (capturado pelo middleware de autenticacao).
 */
export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}
