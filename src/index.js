import { initMongoConnection } from './db/initMongoDb.js';
import { setupServer } from './server.js';
import { getEnvVariables } from './utils/getEnvVarviables.js';

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();

const PORT = Number(getEnvVariables('PORT', '3000'));
console.log(PORT);
