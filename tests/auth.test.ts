import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { resetTestDatabase, testPrisma } from './helpers/testPrisma';

const validUser = {
  name: 'Ana Souza',
  email: 'ana@example.com',
  password: 'senha123',
};

describe('Autenticacao e perfil', () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  afterAll(async () => {
    await resetTestDatabase();
    await testPrisma.$disconnect();
  });

  async function registerAndGetToken(): Promise<string> {
    const res = await request(app).post('/auth/register').send(validUser);
    return res.body.token;
  }

  describe('POST /auth/register', () => {
    it('cria usuario, retorna 201 com token e SEM a senha', async () => {
      const res = await request(app).post('/auth/register').send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toMatchObject({ name: validUser.name, email: validUser.email });
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('rejeita e-mail duplicado com 409', async () => {
      await request(app).post('/auth/register').send(validUser);
      const res = await request(app).post('/auth/register').send(validUser);

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('EMAIL_ALREADY_EXISTS');
    });

    it('rejeita dados invalidos com 422 (validacao Zod)', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ name: 'A', email: 'invalido', password: '123' });

      expect(res.status).toBe(422);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });

    it('persiste a senha como hash, nunca em texto puro', async () => {
      await request(app).post('/auth/register').send(validUser);
      const saved = await testPrisma.user.findUnique({ where: { email: validUser.email } });

      expect(saved?.password).toBeDefined();
      expect(saved?.password).not.toBe(validUser.password);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/auth/register').send(validUser);
    });

    it('faz login com credenciais corretas e retorna token', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: validUser.email, password: validUser.password });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('rejeita senha errada com 401 e mensagem generica', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: validUser.email, password: 'errada' });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_CREDENTIALS');
    });

    it('rejeita e-mail inexistente com 401', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'naoexiste@example.com', password: 'senha123' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /auth/me (rota protegida)', () => {
    it('bloqueia sem token com 401', async () => {
      const res = await request(app).get('/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.code).toBe('UNAUTHORIZED');
    });

    it('bloqueia com token invalido com 401', async () => {
      const res = await request(app).get('/auth/me').set('Authorization', 'Bearer token.invalido');
      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_TOKEN');
    });

    it('retorna o usuario logado com token valido (sem senha)', async () => {
      const token = await registerAndGetToken();
      const res = await request(app).get('/auth/me').set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe(validUser.email);
      expect(res.body).not.toHaveProperty('password');
    });
  });

  describe('PUT /users/me (atualizar perfil)', () => {
    it('bloqueia sem token com 401', async () => {
      const res = await request(app).put('/users/me').send({ name: 'Novo Nome' });
      expect(res.status).toBe(401);
    });

    it('atualiza nome e bio do usuario logado', async () => {
      const token = await registerAndGetToken();
      const res = await request(app)
        .put('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Ana Atualizada', bio: 'Minha bio nova' });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Ana Atualizada');
      expect(res.body.bio).toBe('Minha bio nova');
      expect(res.body).not.toHaveProperty('password');
    });

    it('rejeita campo nao permitido com 422 (schema strict)', async () => {
      const token = await registerAndGetToken();
      const res = await request(app)
        .put('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ role: 'admin' });

      expect(res.status).toBe(422);
    });
  });
});
