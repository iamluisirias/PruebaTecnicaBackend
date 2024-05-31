import { z } from 'zod';

import { ApiError, ApiResponse } from '../../helpers';

import { validateLoginSchema } from '../schemas';

const User = require('../../models/user');

export async function loginController(
  body: z.infer<typeof validateLoginSchema>
) {
  const { password } = body;

  // manage errors
  if (password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  let authenticated = false;
  // get user with that email

  const user = await User.findAll();

  console.log(user);

  // Something happened

  // all good
  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      authenticated,
      email: body.email,
      username: 'example',
      rol: 'admin',
    },
    title: 'Success',
  });
}
