import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${env.PORT}`);
  console.log(`   Ambiente: ${env.NODE_ENV}`);
  console.log(`   Health:   http://localhost:${env.PORT}/health`);
});
