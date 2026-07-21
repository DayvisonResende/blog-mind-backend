import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { routes } from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app = express();

// Seguranca e parsing
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use(routes);

// 404 e tratamento central de erros (sempre por ultimo)
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
