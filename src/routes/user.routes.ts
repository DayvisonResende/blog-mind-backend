import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validateBody } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { updateProfileSchema } from '../dtos/user.dto';

const userRoutes = Router();

userRoutes.put('/users/me', authenticate, validateBody(updateProfileSchema), userController.updateMe);

export { userRoutes };
