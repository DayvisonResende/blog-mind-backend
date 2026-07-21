import { Request, Response } from 'express';
import { AuthService, authService } from '../services/auth.service';
import { userService, UserService } from '../services/user.service';
import { AppError } from '../utils/AppError';

/**
 * Controller de autenticacao. Metodos como arrow properties para
 * preservar o `this` quando passados como handlers de rota.
 */
export class AuthController {
  constructor(
    private readonly auth: AuthService = authService,
    private readonly users: UserService = userService,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.auth.register(req.body);
    res.status(201).json(result);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.auth.login(req.body);
    res.status(200).json(result);
  };

  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Nao autenticado', 401, 'UNAUTHORIZED');
    }
    const user = await this.users.getById(req.user.id);
    res.status(200).json(user);
  };
}

export const authController = new AuthController();
