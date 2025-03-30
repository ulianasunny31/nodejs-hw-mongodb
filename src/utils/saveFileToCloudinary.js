import { v2 as cloudinary } from 'cloudinary';
import { getEnvVariables } from './getEnvVarviables.js';
import { CLOUDINARY } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVariables(CLOUDINARY.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVariables(CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: getEnvVariables(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export async function saveFileToCloudinary(file) {
  const res = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return res.secure_url;
}
