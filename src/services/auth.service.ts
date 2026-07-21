import { UserRepository, userRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { toUserResponse, UserResponse } from '../dtos/user.dto';
import { RegisterInput, LoginInput } from '../dtos/auth.dto';
import { AppError } from '../utils/AppError';

interface AuthResult {
  user: UserResponse;
  token: string;
}

/**
 * Regras de negocio de autenticacao: cadastro e login.
 */
export class AuthService {
  constructor(private readonly users: UserRepository = userRepository) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await this.users.findByEmail(input.email);
    if (existing) {
      throw new AppError('E-mail ja cadastrado', 409, 'EMAIL_ALREADY_EXISTS');
    }

    const password = await hashPassword(input.password);
    const user = await this.users.create({
      name: input.name,
      email: input.email,
      password,
    });

    return { user: toUserResponse(user), token: this.tokenFor(user.id, user.role) };
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await this.users.findByEmail(input.email);
    // Mensagem generica de proposito: nao revela se o e-mail existe.
    if (!user || !(await comparePassword(input.password, user.password))) {
      throw new AppError('Credenciais invalidas', 401, 'INVALID_CREDENTIALS');
    }

    return { user: toUserResponse(user), token: this.tokenFor(user.id, user.role) };
  }

  private tokenFor(id: string, role: string): string {
    return signToken({ sub: id, role });
  }
}

export const authService = new AuthService();
