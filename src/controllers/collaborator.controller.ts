import { z } from 'zod';
import { ApiError, ApiResponse } from '../../helpers';

import { validateCollaboratorSchema } from '../schemas';

export async function createCollaborator(
  body: z.infer<typeof validateCollaboratorSchema>
) {
  const { email, firstName, job, lastName, password, phone } = body;

  if (password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  // var authenticated = false;
  // if (
  //   body.email == user.email &&
  //   (await compareHashedPassword(body.password, user.password))
  // ) {
  //   authenticated = true;
  // } else {
  //   throw new ApiError({
  //     statusCode: 401,
  //     message: 'Unauthorized',
  //     title: 'Error',
  //   });
  // }

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      authenticated: true,
      email: body.email,
      username: 'example',
      rol: 'admin',
    },
    title: 'Success',
  });
}

export const updateCollaborator = (req: Request, res: Response) => {};

export const deleteCollaborator = (req: Request, res: Response) => {};

export const getCollaborator = (req: Request, res: Response) => {};

export const getCollaborators = (req: Request, res: Response) => {};
