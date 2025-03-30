import { SMTP } from '../constants/index.js';
import nodemailer from 'nodemailer';
import { getEnvVariables } from './getEnvVarviables.js';

const transporter = nodemailer.createTransport({
  host: getEnvVariables(SMTP.SMTP_HOST),
  port: getEnvVariables(SMTP.SMTP_PORT),
  auth: {
    user: getEnvVariables(SMTP.SMTP_USER),
    pass: getEnvVariables(SMTP.SMTP_PASSWORD),
  },
});

export async function sendEmail(options) {
  return await transporter.sendMail(options);
}
