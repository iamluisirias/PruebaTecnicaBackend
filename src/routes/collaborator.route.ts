import { Router } from 'express';
import { validateCollaboratorSchema } from '../schemas';
import { userController } from '../controllers/user';
import { createCollaborator } from '../controllers/collaborator.controller';

const router = Router();

router.post('/collaborator', async function (req, res) {
  const values = await validateCollaboratorSchema.parseAsync(req.body);

  const response = await createCollaborator(values);

  return res.status(response.statusCode).json(response);
});

router.get('/collaborators', async function (req, res) {
  // Checking the values received
  const values = await validateCollaboratorSchema.parseAsync(req.body);

  // trynd the response
  const response = await userController(values);

  return res.status(response.statusCode).json(response);
});

export default router;
