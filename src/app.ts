import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { routes } from './routes';
import { UPLOADS_DIR } from './utils/image';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app = express();

// Seguranca e parsing
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir as imagens de capa enviadas (armazenamento local)
app.use('/uploads', express.static(UPLOADS_DIR));

// Rotas da API
app.use(routes);

// 404 e tratamento central de erros (sempre por ultimo)
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
