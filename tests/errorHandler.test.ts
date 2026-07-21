import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { z } from 'zod';
import { errorHandler } from '../src/middlewares/errorHandler';
import { AppError } from '../src/utils/AppError';

/**
 * App minimo com rotas que disparam cada tipo de erro,
 * para testar o middleware central isoladamente.
 * Em Express 5, erros async chegam ao handler automaticamente.
 */
function makeApp() {
  const app = express();

  app.get('/app-error', () => {
    throw new AppError('Recurso nao encontrado', 404, 'NOT_FOUND');
  });

  app.get('/zod-error', () => {
    z.object({ nome: z.string() }).parse({ nome: 123 });
  });

  app.get('/unknown-error', () => {
    throw new Error('boom inesperado');
  });

  app.use(errorHandler);
  return app;
}

describe('errorHandler (middleware central de erros)', () => {
  const app = makeApp();

  it('AppError -> usa statusCode e code informados', async () => {
    const res = await request(app).get('/app-error');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Recurso nao encontrado', code: 'NOT_FOUND' });
  });

  it('ZodError -> 422 com code VALIDATION_ERROR e issues', async () => {
    const res = await request(app).get('/zod-error');

    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(Array.isArray(res.body.issues)).toBe(true);
    expect(res.body.issues.length).toBeGreaterThan(0);
  });

  it('Erro inesperado -> 500 sem vazar stack, com code INTERNAL_SERVER_ERROR', async () => {
    const res = await request(app).get('/unknown-error');

    expect(res.status).toBe(500);
    expect(res.body.code).toBe('INTERNAL_SERVER_ERROR');
    expect(res.body).not.toHaveProperty('stack');
  });
});

describe('AppError (classe)', () => {
  it('usa valores padrao quando nao informados', () => {
    const err = new AppError('algo');
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('BAD_REQUEST');
    expect(err.message).toBe('algo');
    expect(err).toBeInstanceOf(Error);
  });
});
