import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  RegisterValidationSchema,
  LoginValidationSchema,
  RequestEmailSchema,
  ResetPasswordSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  requestResetController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(RegisterValidationSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(LoginValidationSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserController));

router.post(
  '/send-reset-email',
  validateBody(RequestEmailSchema),
  ctrlWrapper(requestResetController),
);

router.post(
  '/reset-pwd',
  validateBody(ResetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
