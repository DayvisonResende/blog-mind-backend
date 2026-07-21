import { UserRepository, userRepository } from '../repositories/user.repository';
import { toUserResponse, UserResponse, UpdateProfileInput } from '../dtos/user.dto';
import { AppError } from '../utils/AppError';

/**
 * Regras de negocio do perfil do usuario.
 */
export class UserService {
  constructor(private readonly users: UserRepository = userRepository) {}

  async getById(id: string): Promise<UserResponse> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new AppError('Usuario nao encontrado', 404, 'USER_NOT_FOUND');
    }
    return toUserResponse(user);
  }

  async updateProfile(id: string, input: UpdateProfileInput): Promise<UserResponse> {
    // Garante que o usuario existe antes de atualizar.
    await this.getById(id);
    const user = await this.users.update(id, input);
    return toUserResponse(user);
  }
}

export const userService = new UserService();
