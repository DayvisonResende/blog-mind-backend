import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { registerSchema, loginSchema } from '../dtos/auth.dto';

const authRoutes = Router();

authRoutes.post('/auth/register', validateBody(registerSchema), authController.register);
authRoutes.post('/auth/login', validateBody(loginSchema), authController.login);
authRoutes.get('/auth/me', authenticate, authController.me);

export { authRoutes };
