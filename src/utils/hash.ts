import bcrypt from 'bcryptjs';

/** Numero de rounds do bcrypt (salt >= 10, conforme exigido no case). */
const SALT_ROUNDS = 10;

/** Gera o hash bcrypt de uma senha em texto puro. */
export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

/** Compara uma senha em texto puro com um hash bcrypt. */
export function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
