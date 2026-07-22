import { Request, Response } from 'express';
import { UserService, userService } from '../services/user.service';
import { updateProfileSchema } from '../dtos/user.dto';
import { AppError } from '../utils/AppError';

export class UserController {
  constructor(private readonly users: UserService = userService) {}

  updateMe = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Não autenticado', 401, 'UNAUTHORIZED');
    }
    const input = updateProfileSchema.parse(req.body);
    const user = await this.users.updateProfile(req.user.id, input, req.file?.buffer);
    res.status(200).json(user);
  };
}

export const userController = new UserController();
