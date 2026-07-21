/**
 * Erro de aplicacao com status HTTP e codigo semantico.
 * Lancado pelas camadas de service/controller para ser capturado
 * pelo middleware central de tratamento de erros.
 *
 * Ex.: throw new AppError('Artigo nao encontrado', 404, 'ARTICLE_NOT_FOUND');
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
