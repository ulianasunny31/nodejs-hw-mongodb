import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

export default router;
