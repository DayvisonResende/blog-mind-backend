// Carrega as variaveis de ambiente (.env) antes dos testes rodarem.
import 'dotenv/config';

// Redireciona TODO o acesso ao banco durante os testes para o banco de teste
// (blog_mind_test), garantindo que a suite nunca toque os dados de dev.
// Precisa acontecer antes de qualquer import do PrismaClient.
if (process.env.TEST_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}
