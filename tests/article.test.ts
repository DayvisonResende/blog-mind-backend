import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { app } from '../src/app';
import { resetTestDatabase, testPrisma } from './helpers/testPrisma';
import { UPLOADS_DIR } from '../src/utils/image';

/** Registra um usuario via API e devolve token + id. */
async function createUser(email = 'autor@test.com') {
  const res = await request(app)
    .post('/auth/register')
    .send({ name: 'Autor Teste', email, password: 'senha123' });
  return { token: res.body.token as string, id: res.body.user.id as string };
}

/** Cria um artigo simples (sem imagem) para um usuario. */
async function createArticle(token: string, overrides: Record<string, string> = {}) {
  return request(app)
    .post('/articles')
    .set('Authorization', `Bearer ${token}`)
    .field('title', overrides.title ?? 'Meu Primeiro Artigo')
    .field('summary', overrides.summary ?? 'Um resumo do artigo')
    .field('content', overrides.content ?? 'Conteudo do artigo com algumas palavras aqui.')
    .field('category', overrides.category ?? 'Tecnologia')
    .field('tags', overrides.tags ?? 'typescript, node');
}

describe('Artigos', () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  afterAll(async () => {
    await resetTestDatabase();
    await testPrisma.$disconnect();
  });

  describe('POST /articles', () => {
    it('cria artigo (201) com tags, tempo de leitura calculado e contadores zerados', async () => {
      const { token } = await createUser();
      const res = await createArticle(token);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Meu Primeiro Artigo');
      expect(res.body.tags).toEqual(expect.arrayContaining(['typescript', 'node']));
      expect(res.body.readingTime).toBeGreaterThanOrEqual(1);
      expect(res.body.views).toBe(0);
      expect(res.body.likesCount).toBe(0);
      expect(res.body.commentsCount).toBe(0);
      expect(res.body.author.name).toBe('Autor Teste');
    });

    it('bloqueia criacao sem token (401)', async () => {
      const res = await request(app)
        .post('/articles')
        .field('title', 'X')
        .field('summary', 'Y')
        .field('content', 'Z')
        .field('category', 'C');
      expect(res.status).toBe(401);
    });

    it('rejeita dados invalidos (422)', async () => {
      const { token } = await createUser();
      const res = await request(app)
        .post('/articles')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'ab')
        .field('summary', 'x')
        .field('content', '')
        .field('category', '');
      expect(res.status).toBe(422);
    });

    it('salva a capa comprimida quando enviada e retorna o caminho', async () => {
      const { token } = await createUser();
      const imageBuffer = await sharp({
        create: { width: 100, height: 100, channels: 3, background: { r: 10, g: 150, b: 200 } },
      })
        .png()
        .toBuffer();

      const res = await request(app)
        .post('/articles')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Artigo com capa')
        .field('summary', 'Resumo')
        .field('content', 'Conteudo do artigo.')
        .field('category', 'Tech')
        .attach('coverImage', imageBuffer, 'capa.png');

      expect(res.status).toBe(201);
      expect(res.body.coverImage).toMatch(/^\/uploads\/.+\.jpg$/);

      // confirma que o arquivo foi realmente salvo e limpa
      const filePath = path.join(UPLOADS_DIR, path.basename(res.body.coverImage));
      await expect(fs.access(filePath)).resolves.toBeUndefined();
      await fs.rm(filePath, { force: true });
    });
  });

  describe('GET /articles (listagem)', () => {
    it('pagina e retorna meta', async () => {
      const { token } = await createUser();
      for (let i = 0; i < 3; i++) {
        await createArticle(token, { title: `Artigo ${i}` });
      }

      const res = await request(app).get('/articles?page=1&limit=2');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(2);
      expect(res.body.meta).toMatchObject({ page: 1, limit: 2, total: 3, totalPages: 2 });
    });

    it('filtra por busca no titulo', async () => {
      const { token } = await createUser();
      await createArticle(token, { title: 'Aprendendo Prisma' });
      await createArticle(token, { title: 'Aprendendo Docker' });

      const res = await request(app).get('/articles?search=Prisma');
      expect(res.body.items).toHaveLength(1);
      expect(res.body.items[0].title).toBe('Aprendendo Prisma');
    });

    it('filtra por categoria', async () => {
      const { token } = await createUser();
      await createArticle(token, { title: 'Artigo Backend', category: 'Backend' });
      await createArticle(token, { title: 'Artigo Frontend', category: 'Frontend' });

      const res = await request(app).get('/articles?category=Backend');
      expect(res.body.items).toHaveLength(1);
      expect(res.body.items[0].category).toBe('Backend');
    });
  });

  describe('GET /articles/:id', () => {
    it('retorna o detalhe e incrementa as views a cada acesso', async () => {
      const { token } = await createUser();
      const created = await createArticle(token);
      const id = created.body.id;

      const first = await request(app).get(`/articles/${id}`);
      expect(first.status).toBe(200);
      expect(first.body.views).toBe(1);

      const second = await request(app).get(`/articles/${id}`);
      expect(second.body.views).toBe(2);
    });

    it('retorna 404 para artigo inexistente', async () => {
      const res = await request(app).get('/articles/id-que-nao-existe');
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /articles/:id (autorizacao)', () => {
    it('o autor edita e o tempo de leitura e recalculado', async () => {
      const { token } = await createUser();
      const created = await createArticle(token);
      const longContent = Array(400).fill('palavra').join(' ');

      const res = await request(app)
        .put(`/articles/${created.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Titulo Editado')
        .field('content', longContent);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Titulo Editado');
      expect(res.body.readingTime).toBe(2); // 400/200
    });

    it('impede que outro usuario edite (403)', async () => {
      const autor = await createUser('autor@test.com');
      const outro = await createUser('outro@test.com');
      const created = await createArticle(autor.token);

      const res = await request(app)
        .put(`/articles/${created.body.id}`)
        .set('Authorization', `Bearer ${outro.token}`)
        .field('title', 'Invasao');

      expect(res.status).toBe(403);
      expect(res.body.code).toBe('FORBIDDEN');
    });
  });

  describe('DELETE /articles/:id (autorizacao)', () => {
    it('o autor exclui (204)', async () => {
      const { token } = await createUser();
      const created = await createArticle(token);

      const res = await request(app)
        .delete(`/articles/${created.body.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(204);

      const check = await request(app).get(`/articles/${created.body.id}`);
      expect(check.status).toBe(404);
    });

    it('impede que outro usuario exclua (403)', async () => {
      const autor = await createUser('autor@test.com');
      const outro = await createUser('outro@test.com');
      const created = await createArticle(autor.token);

      const res = await request(app)
        .delete(`/articles/${created.body.id}`)
        .set('Authorization', `Bearer ${outro.token}`);
      expect(res.status).toBe(403);
    });
  });

  describe('Dashboard e categorias', () => {
    it('GET /categories retorna categorias distintas', async () => {
      const { token } = await createUser();
      await createArticle(token, { title: 'Artigo Um', category: 'Backend' });
      await createArticle(token, { title: 'Artigo Dois', category: 'Frontend' });
      await createArticle(token, { title: 'Artigo Tres', category: 'Backend' });

      const res = await request(app).get('/categories');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining(['Backend', 'Frontend']));
      expect(res.body).toHaveLength(2);
    });

    it('GET /users/me/articles retorna so os artigos do usuario', async () => {
      const autor = await createUser('autor@test.com');
      const outro = await createUser('outro@test.com');
      await createArticle(autor.token, { title: 'Meu' });
      await createArticle(outro.token, { title: 'De outro' });

      const res = await request(app)
        .get('/users/me/articles')
        .set('Authorization', `Bearer ${autor.token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('Meu');
    });

    it('GET /dashboard/stats agrega estatisticas do autor', async () => {
      const { token } = await createUser();
      await createArticle(token, { title: 'Artigo Um' });
      await createArticle(token, { title: 'Artigo Dois' });

      const res = await request(app)
        .get('/dashboard/stats')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.totalArticles).toBe(2);
      expect(res.body).toHaveProperty('totalLikes');
      expect(res.body).toHaveProperty('totalComments');
      expect(res.body).toHaveProperty('avgReadingTime');
    });

    it('bloqueia /dashboard/stats sem token (401)', async () => {
      const res = await request(app).get('/dashboard/stats');
      expect(res.status).toBe(401);
    });
  });
});
