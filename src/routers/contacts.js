import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validatieBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactValidation,
  updateContactValidation,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactValidation),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactValidation),
  ctrlWrapper(updateContactController),
);

export default router;
