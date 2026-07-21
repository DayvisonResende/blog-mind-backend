import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { resetTestDatabase, testPrisma } from './helpers/testPrisma';

async function createUser(email: string) {
  const res = await request(app)
    .post('/auth/register')
    .send({ name: 'Usuario', email, password: 'senha123' });
  return { token: res.body.token as string, id: res.body.user.id as string };
}

async function createArticle(token: string): Promise<string> {
  const res = await request(app)
    .post('/articles')
    .set('Authorization', `Bearer ${token}`)
    .field('title', 'Artigo de Engajamento')
    .field('summary', 'Resumo')
    .field('content', 'Conteudo do artigo para engajamento.')
    .field('category', 'Tech');
  return res.body.id;
}

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

describe('Comentarios, curtidas, salvar e newsletter', () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  afterAll(async () => {
    await resetTestDatabase();
    await testPrisma.$disconnect();
  });

  describe('Comentarios', () => {
    it('cria comentario autenticado (201)', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);

      const res = await request(app)
        .post(`/articles/${articleId}/comments`)
        .set(auth(user.token))
        .send({ content: 'Otimo artigo!' });

      expect(res.status).toBe(201);
      expect(res.body.content).toBe('Otimo artigo!');
      expect(res.body.author.name).toBe('Usuario');
      expect(res.body.likesCount).toBe(0);
    });

    it('bloqueia comentario sem token (401)', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);
      const res = await request(app)
        .post(`/articles/${articleId}/comments`)
        .send({ content: 'Sem login' });
      expect(res.status).toBe(401);
    });

    it('sanitiza XSS no conteudo do comentario', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);

      const res = await request(app)
        .post(`/articles/${articleId}/comments`)
        .set(auth(user.token))
        .send({ content: '<script>alert("xss")</script>Ola' });

      expect(res.status).toBe(201);
      expect(res.body.content).not.toContain('<script>');
    });

    it('lista comentarios (publico) e mostra liked quando logado', async () => {
      const autor = await createUser('autor@test.com');
      const leitor = await createUser('leitor@test.com');
      const articleId = await createArticle(autor.token);
      const created = await request(app)
        .post(`/articles/${articleId}/comments`)
        .set(auth(autor.token))
        .send({ content: 'Comentario 1' });
      const commentId = created.body.id;

      // leitor curte o comentario
      await request(app).post(`/comments/${commentId}/like`).set(auth(leitor.token));

      const publico = await request(app).get(`/articles/${articleId}/comments`);
      expect(publico.status).toBe(200);
      expect(publico.body).toHaveLength(1);
      expect(publico.body[0].liked).toBe(false); // visitante
      expect(publico.body[0].likesCount).toBe(1);

      const logado = await request(app)
        .get(`/articles/${articleId}/comments`)
        .set(auth(leitor.token));
      expect(logado.body[0].liked).toBe(true); // quem curtiu
    });

    it('o autor exclui o comentario (204); outro nao (403)', async () => {
      const autor = await createUser('autor@test.com');
      const outro = await createUser('outro@test.com');
      const articleId = await createArticle(autor.token);
      const created = await request(app)
        .post(`/articles/${articleId}/comments`)
        .set(auth(autor.token))
        .send({ content: 'Meu comentario' });
      const commentId = created.body.id;

      const proibido = await request(app).delete(`/comments/${commentId}`).set(auth(outro.token));
      expect(proibido.status).toBe(403);

      const ok = await request(app).delete(`/comments/${commentId}`).set(auth(autor.token));
      expect(ok.status).toBe(204);
    });
  });

  describe('Curtir artigo (toggle)', () => {
    it('curte e descurte alternando active e count', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);

      const like = await request(app).post(`/articles/${articleId}/like`).set(auth(user.token));
      expect(like.status).toBe(200);
      expect(like.body).toEqual({ active: true, count: 1 });

      const unlike = await request(app).post(`/articles/${articleId}/like`).set(auth(user.token));
      expect(unlike.body).toEqual({ active: false, count: 0 });
    });

    it('nao permite curtir sem token (401)', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);
      const res = await request(app).post(`/articles/${articleId}/like`);
      expect(res.status).toBe(401);
    });

    it('retorna 404 ao curtir artigo inexistente', async () => {
      const user = await createUser('a@test.com');
      const res = await request(app).post('/articles/nao-existe/like').set(auth(user.token));
      expect(res.status).toBe(404);
    });

    it('conta apenas uma curtida por usuario (restricao unica)', async () => {
      const u1 = await createUser('u1@test.com');
      const u2 = await createUser('u2@test.com');
      const articleId = await createArticle(u1.token);

      await request(app).post(`/articles/${articleId}/like`).set(auth(u1.token));
      const res = await request(app).post(`/articles/${articleId}/like`).set(auth(u2.token));
      expect(res.body.count).toBe(2);
    });
  });

  describe('Salvar artigo (toggle)', () => {
    it('salva e remove alternando active', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);

      const save = await request(app).post(`/articles/${articleId}/save`).set(auth(user.token));
      expect(save.body).toEqual({ active: true });

      const unsave = await request(app).post(`/articles/${articleId}/save`).set(auth(user.token));
      expect(unsave.body).toEqual({ active: false });
    });
  });

  describe('Detalhe com isLiked/isSaved', () => {
    it('reflete o estado do usuario logado', async () => {
      const user = await createUser('a@test.com');
      const articleId = await createArticle(user.token);
      await request(app).post(`/articles/${articleId}/like`).set(auth(user.token));
      await request(app).post(`/articles/${articleId}/save`).set(auth(user.token));

      const logado = await request(app).get(`/articles/${articleId}`).set(auth(user.token));
      expect(logado.body.isLiked).toBe(true);
      expect(logado.body.isSaved).toBe(true);

      const visitante = await request(app).get(`/articles/${articleId}`);
      expect(visitante.body.isLiked).toBe(false);
      expect(visitante.body.isSaved).toBe(false);
    });
  });

  describe('Newsletter', () => {
    it('inscreve um e-mail novo (201)', async () => {
      const res = await request(app)
        .post('/newsletter/subscribe')
        .send({ email: 'novo@example.com' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ subscribed: true, alreadySubscribed: false });
    });

    it('e idempotente para e-mail ja inscrito', async () => {
      await request(app).post('/newsletter/subscribe').send({ email: 'dup@example.com' });
      const res = await request(app)
        .post('/newsletter/subscribe')
        .send({ email: 'dup@example.com' });
      expect(res.body.alreadySubscribed).toBe(true);
    });

    it('rejeita e-mail invalido (422)', async () => {
      const res = await request(app).post('/newsletter/subscribe').send({ email: 'invalido' });
      expect(res.status).toBe(422);
    });
  });
});
