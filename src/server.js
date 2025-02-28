import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVariables } from './utils/getEnvVarviables.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVariables('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());

  //pino pretty
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //get all
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  //get one by id

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data: contact,
    });
  });

  //non-existant routes handling
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
