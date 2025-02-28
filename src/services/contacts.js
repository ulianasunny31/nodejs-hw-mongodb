import { ContactsCollection } from '../db/model/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactID) => {
  const contact = await ContactsCollection.findOne(contactID);
  return contact;
};
