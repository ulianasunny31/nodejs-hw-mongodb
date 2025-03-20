import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { UsersValidationSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(UsersValidationSchema),
  ctrlWrapper(registerUserController),
);

export default router;
