import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate';
import { uploadAvatar } from '../middlewares/upload';

const userRoutes = Router();

// Multipart: foto de perfil (campo "avatar") + campos de texto (name/bio).
userRoutes.put('/users/me', authenticate, uploadAvatar, userController.updateMe);

export { userRoutes };
