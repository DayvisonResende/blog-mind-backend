/**
 * Estende o Request do Express para carregar o usuario autenticado,
 * injetado pelo middleware de autenticacao apos validar o JWT.
 */
declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: string;
    }
    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
