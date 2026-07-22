import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

/**
 * Limita tentativas em rotas sensiveis de autenticacao (login/cadastro),
 * mitigando forca-bruta. Desativado no ambiente de teste.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { message: 'Muitas tentativas. Tente novamente mais tarde.', code: 'RATE_LIMITED' },
});
