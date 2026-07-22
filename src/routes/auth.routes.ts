import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authLimiter } from '../middlewares/rateLimiter';
import { registerSchema, loginSchema } from '../dtos/auth.dto';

const authRoutes = Router();

authRoutes.post('/auth/register', authLimiter, validateBody(registerSchema), authController.register);
authRoutes.post('/auth/login', authLimiter, validateBody(loginSchema), authController.login);
authRoutes.get('/auth/me', authenticate, authController.me);

export { authRoutes };
