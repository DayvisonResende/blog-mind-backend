import { Request, Response } from 'express';
import { UserService, userService } from '../services/user.service';
import { AppError } from '../utils/AppError';

/**
 * Controller do perfil do usuario.
 */
export class UserController {
  constructor(private readonly users: UserService = userService) {}

  updateMe = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Nao autenticado', 401, 'UNAUTHORIZED');
    }
    const user = await this.users.updateProfile(req.user.id, req.body);
    res.status(200).json(user);
  };
}

export const userController = new UserController();
