import mongoose from 'mongoose';
import { getEnvVariables } from '../utils/getEnvVarviables.js';

export function initMongoConnection() {
  try {
    const pwd = getEnvVariables('MONGODB_PASSWORD');
    const user = getEnvVariables('MONGODB_USER');
    const url = getEnvVariables('MONGODB_URL');
    const db = getEnvVariables('MONGODB_DB');

    //connecting to db
    mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established');
  } catch (e) {
    console.log('Error in setting up Mongo connetion: ', e.message);
    throw e;
  }
}
