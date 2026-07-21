import { PrismaClient } from '@prisma/client';

/**
 * Cliente Prisma dedicado aos testes: aponta para o banco `blog_mind_test`
 * (TEST_DATABASE_URL), garantindo que os testes nunca toquem os dados de
 * desenvolvimento. Se a variavel nao estiver definida, falha com mensagem clara.
 */
const url = process.env.TEST_DATABASE_URL;

if (!url) {
  throw new Error(
    'TEST_DATABASE_URL nao definida. Configure o banco de teste no .env para rodar os testes de banco.',
  );
}

export const testPrisma = new PrismaClient({
  datasources: { db: { url } },
});

/** Apaga todos os dados do banco de teste, na ordem correta das FKs. */
export async function resetTestDatabase() {
  await testPrisma.articleLike.deleteMany();
  await testPrisma.comment.deleteMany();
  await testPrisma.article.deleteMany();
  await testPrisma.user.deleteMany();
}
