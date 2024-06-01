import { z } from 'zod';
import { ApiError, ApiResponse, hashPassword } from '../../helpers';

import { validateCollaboratorSchema } from '../schemas';

const models = require('../../models');

export async function createCollaborator(
  body: z.infer<typeof validateCollaboratorSchema>
) {
  // const { email, firstName, job, lastName, password, phone } = body;

  if (body.password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  if (
    body.firstName === '' ||
    body.lastName === '' ||
    body.job === '' ||
    body.phone === '' ||
    body.email === ''
  ) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid data',
      title: 'Warning',
    });
  }

  const collaborator = await models.Collaborator.create({
    firstName: body.firstName,
    lastName: body.lastName,
    job: body.job,
    identity: body.identity,
    phone: body.phone,
    email: body.email,
    password: await hashPassword(body.password),
  });

  // all good
  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      id: collaborator.id,
      firstName: collaborator.firstName,
      lastName: collaborator.lastName,
      email: collaborator.email,
    },
    title: 'Success',
  });
}

export async function getCollaborator(id: string) {
  const collaborator = await models.Collaborator.findOne({
    where: {
      id,
    },
  });

  if (!collaborator) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid collaborator',
      title: 'Warning',
    });
  }

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      id: collaborator.id,
      firstName: collaborator.firstName,
      lastName: collaborator.lastName,
      email: collaborator.email,
    },
    title: 'Success',
  });
}

export async function getCollaborators() {
  const collaborators = await models.Collaborator.findAll();

  if (!collaborators) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid collaborators',
      title: 'Warning',
    });
  }

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      collaborators,
    },
    title: 'Success',
  });
}

export async function updateCollaborator(
  body: z.infer<typeof validateCollaboratorSchema>,
  id: string
) {
  if (body.password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  if (
    body.firstName === '' ||
    body.lastName === '' ||
    body.job === '' ||
    body.phone === '' ||
    body.email === ''
  ) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid data',
      title: 'Warning',
    });
  }

  console.log('update collaborator');

  const collaborator = await models.Collaborator.findOne({
    where: {
      id,
    },
  });

  console.log(collaborator);

  if (!collaborator) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid collaborator',
      title: 'Warning',
    });
  }

  const updatedCollaborator = await models.Collaborator.update(
    {
      firstName: body.firstName,
      lastName: body.lastName,
      job: body.job,
      identity: body.identity,
      phone: body.phone,
      email: body.email,
      password: await hashPassword(body.password),
    },
    {
      where: {
        id,
      },
    }
  );

  console.log({ updateCollaborator: collaborator.id });

  // all good
  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      ...updatedCollaborator,
    },
    title: 'Success',
  });
}

export async function deleteCollaborator(id: string) {
  const collaborator = await models.Collaborator.findOne({
    where: {
      id,
    },
  });

  if (!collaborator) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid collaborator',
      title: 'Warning',
    });
  }

  const deletedCollaborator = await models.Collaborator.destroy({
    where: {
      id,
    },
  });

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    title: 'Success',
  });
}
