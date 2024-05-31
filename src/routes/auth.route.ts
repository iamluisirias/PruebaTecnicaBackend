import { Router } from 'express';

import {
  loginController,
  registerController,
} from '../controllers/auth.controller';
import { validateLoginSchema, validateRegisterSchema } from '../schemas';

const router = Router();

router.post('/login', async function (req, res) {
  // Checking the values received
  const values = await validateLoginSchema.parseAsync(req.body);

  // trying the response
  const response = await loginController(values);

  return res.status(response.statusCode).json(response);
});

router.post('/register', async function (req, res) {
  // Checking the values received
  const values = await validateRegisterSchema.parseAsync(req.body);

  // trying the response
  const response = await registerController(values);

  return res.status(response.statusCode).json(response);
});

export default router;
