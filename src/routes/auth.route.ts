import { Router } from 'express';

import { loginController } from '../controllers/auth.controller';
import { validateLoginSchema } from '../schemas';

const router = Router();

router.post('/login', async function (req, res) {
  // Checking the values received
  const values = await validateLoginSchema.parseAsync(req.body);

  // trying the response
  const response = await loginController(values);

  return res.status(response.statusCode).json(response);
});

export default router;
