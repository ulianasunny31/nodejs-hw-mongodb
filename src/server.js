import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import router from './routers/index.js';

import { getEnvVariables } from './utils/getEnvVarviables.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPDLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVariables('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use('/uploads', express.static(UPDLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //pino pretty
  app.use(
    pino({
      autoLogging: false,
      transport: {
        target: 'pino-pretty',
      },
      level: 'error',
    }),
  );

  app.use(router);

  //error routes handling
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
