import { TEMPLATES_DIR, UPDLOAD_DIR } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getEnvVariables } from './getEnvVarviables.js';

export async function saveFileToUploadDir(file) {
  fs.rename(
    path.join(TEMPLATES_DIR, file.filename),
    path.join(UPDLOAD_DIR, file.filename),
  );

  return `${getEnvVariables('DOMAIN')}/uploads/${file.filename}`;
}
