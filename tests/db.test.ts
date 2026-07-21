import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { testPrisma, resetTestDatabase } from './helpers/testPrisma';

/**
 * Testes de integracao do schema no banco `blog_mind_test`.
 * Validam relacionamentos, restricoes de unicidade, cascade delete
 * e o armazenamento seguro da senha (hash bcrypt).
 */
describe('Schema do banco (integracao)', () => {
  beforeAll(async () => {
    await resetTestDatabase();
  });

  beforeEach(async () => {
    await resetTestDatabase();
  });

  afterAll(async () => {
    await resetTestDatabase();
    await testPrisma.$disconnect();
  });

  async function createUser(email = 'user@test.com') {
    return testPrisma.user.create({
      data: {
        name: 'Usuario Teste',
        email,
        password: await bcrypt.hash('senha123', 10),
      },
    });
  }

  it('cria usuario com id UUID e role padrao "user"', async () => {
    const user = await createUser();
    expect(user.id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(user.role).toBe('user');
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('armazena a senha como hash bcrypt, nunca em texto puro', async () => {
    const user = await createUser();
    expect(user.password).not.toBe('senha123');
    expect(await bcrypt.compare('senha123', user.password)).toBe(true);
  });

  it('impede dois usuarios com o mesmo e-mail (unique)', async () => {
    await createUser('dup@test.com');
    await expect(createUser('dup@test.com')).rejects.toBeInstanceOf(
      Prisma.PrismaClientKnownRequestError,
    );
  });

  it('relaciona artigo ao autor e permite buscar com include', async () => {
    const author = await createUser('author@test.com');
    const article = await testPrisma.article.create({
      data: {
        title: 'Meu artigo',
        summary: 'Resumo',
        content: 'Conteudo do artigo de teste.',
        category: 'Tech',
        authorId: author.id,
      },
    });

    const found = await testPrisma.article.findUnique({
      where: { id: article.id },
      include: { author: true },
    });

    expect(found?.author.email).toBe('author@test.com');
    expect(found?.views).toBe(0);
  });

  it('impede curtida duplicada do mesmo usuario no mesmo artigo (unique composto)', async () => {
    const user = await createUser('liker@test.com');
    const article = await testPrisma.article.create({
      data: {
        title: 'Artigo curtido',
        summary: 'Resumo',
        content: 'Conteudo.',
        category: 'Tech',
        authorId: user.id,
      },
    });

    await testPrisma.articleLike.create({ data: { articleId: article.id, userId: user.id } });

    await expect(
      testPrisma.articleLike.create({ data: { articleId: article.id, userId: user.id } }),
    ).rejects.toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
  });

  it('apaga artigos, comentarios e curtidas em cascata ao deletar o autor', async () => {
    const author = await createUser('cascade@test.com');
    const article = await testPrisma.article.create({
      data: {
        title: 'Artigo',
        summary: 'Resumo',
        content: 'Conteudo.',
        category: 'Tech',
        authorId: author.id,
      },
    });
    await testPrisma.comment.create({
      data: { content: 'Comentario', articleId: article.id, authorId: author.id },
    });
    await testPrisma.articleLike.create({ data: { articleId: article.id, userId: author.id } });

    await testPrisma.user.delete({ where: { id: author.id } });

    expect(await testPrisma.article.count()).toBe(0);
    expect(await testPrisma.comment.count()).toBe(0);
    expect(await testPrisma.articleLike.count()).toBe(0);
  });
});
