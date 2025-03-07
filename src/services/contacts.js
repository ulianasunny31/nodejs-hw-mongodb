import { ContactsCollection } from '../db/model/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactID) => {
  const contact = await ContactsCollection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactID) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactID });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!contact || !contact.value) return null;

  return {
    contact: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.updated),
  };
};
