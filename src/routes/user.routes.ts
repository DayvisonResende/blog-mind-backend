import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate';
import { uploadAvatar } from '../middlewares/upload';

const userRoutes = Router();

userRoutes.put('/users/me', authenticate, uploadAvatar, userController.updateMe);

export { userRoutes };
