import { Router } from 'express';
import { validateCollaboratorSchema } from '../schemas';

import basicAuth from '../middlewares/basic-auth';

import {
  createCollaborator,
  deleteCollaborator,
  getCollaborator,
  getCollaborators,
  updateCollaborator,
} from '../controllers/collaborator.controller';

const router = Router();

router.post('/collaborator', basicAuth, async function (req, res) {
  const values = await validateCollaboratorSchema.parseAsync(req.body);

  const response = await createCollaborator(values);

  return res.status(response.statusCode).json(response);
});

router.get('/collaborator/:id', basicAuth, async function (req, res) {
  // trying the response
  const response = await getCollaborator(req.params.id);

  return res.status(response.statusCode).json(response);
});

router.get('/collaborators', basicAuth, async function (req, res) {
  //the response
  const response = await getCollaborators();

  return res.status(response.statusCode).json(response);
});

router.put('/collaborator/:id', basicAuth, async function (req, res) {
  const id = req.params.id;

  // Checking the values received
  const values = await validateCollaboratorSchema.parseAsync(req.body);

  // trying the response

  const response = await updateCollaborator(values, id);

  return res.status(response.statusCode).json(response);
});

router.delete('/collaborator/:id', basicAuth, async function (req, res) {
  // trynd the response
  const response = await deleteCollaborator(req.params.id);

  return res.status(response.statusCode).json(response);
});

export default router;
