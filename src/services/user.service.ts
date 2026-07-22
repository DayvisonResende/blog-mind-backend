import type { Prisma } from '@prisma/client';
import { UserRepository, userRepository } from '../repositories/user.repository';
import { toUserResponse, UserResponse, UpdateProfileInput } from '../dtos/user.dto';
import { saveAvatarImage, deleteUploadedImage } from '../utils/image';
import { AppError } from '../utils/AppError';

/**
 * Regras de negocio do perfil do usuario.
 */
export class UserService {
  constructor(private readonly users: UserRepository = userRepository) {}

  async getById(id: string): Promise<UserResponse> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    return toUserResponse(user);
  }

  async updateProfile(
    id: string,
    input: UpdateProfileInput,
    avatarBuffer?: Buffer,
  ): Promise<UserResponse> {
    // Garante que o usuario existe antes de atualizar.
    const existing = await this.getById(id);

    const data: Prisma.UserUpdateInput = { ...input };

    // Nova foto enviada: processa, salva e remove a anterior (se for local).
    if (avatarBuffer) {
      data.avatar = await saveAvatarImage(avatarBuffer);
      await deleteUploadedImage(existing.avatar);
    }

    const user = await this.users.update(id, data);
    return toUserResponse(user);
  }
}

export const userService = new UserService();
