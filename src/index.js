import { initMongoConnection } from './db/initMongoDb.js';
import { setupServer } from './server.js';

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();
