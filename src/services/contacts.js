import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/model/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsReq = ContactsCollection.find();

  if (filter.type) {
    contactsReq.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite) {
    contactsReq.where('isFavourite').equals(filter.isFavourite);
  }

  const [count, contacts] = await Promise.all([
    ContactsCollection.countDocuments(),
    contactsReq
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const paginationData = calculatePaginationData(count, page, perPage);

  return {
    data: contacts,
    paginationData,
  };
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
