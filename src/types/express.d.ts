// Estende o Request do Express com o usuario autenticado (injetado pelo middleware de auth).
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
