import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import router from './routers/contacts.js';

import { getEnvVariables } from './utils/getEnvVarviables.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(getEnvVariables('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  //pino pretty
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
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
