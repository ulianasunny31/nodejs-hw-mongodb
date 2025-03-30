import { TEMP_UPDLOAD_DIR, UPDLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoDb.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

async function bootstrap() {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPDLOAD_DIR);
  await createDirIfNotExists(UPDLOAD_DIR);
  setupServer();
}

bootstrap();
