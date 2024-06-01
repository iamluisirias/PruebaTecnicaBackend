import { z } from 'zod';

import {
  ApiError,
  ApiResponse,
  compareHashedPassword,
  hashPassword,
} from '../../helpers';

import { validateLoginSchema, validateRegisterSchema } from '../schemas';

const models = require('../../models');

export async function loginController(
  body: z.infer<typeof validateLoginSchema>
) {
  // manage errors
  if (body.password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  // get user with that email
  const user = await models.User.findOne({
    where: {
      email: body.email,
    },
  });

  // Something happened, validating data
  if (!user) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized',
      title: 'Error',
    });
  }

  if (
    body.email !== user.email ||
    !(await compareHashedPassword(body.password, user.password))
  ) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized',
      title: 'Error',
    });
  }

  // all good
  // generate token

  const token = Buffer.from(`${body.email}:${body.password}`).toString(
    'base64'
  );

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      authenticated: true,
      email: body.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
      // username: 'example',
      // role: 'admin',
    },
    title: 'Success',
  });
}

export async function registerController(
  body: z.infer<typeof validateRegisterSchema>
) {
  // manage errors
  if (body.password.length < 6) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid password',
      title: 'Warning',
    });
  }

  // Checking if user exists
  const possibleUser = await models.User.findOne({
    where: { email: body.email },
  });

  if (possibleUser) {
    throw new ApiError({
      statusCode: 400,
      message: 'User already exists',
      title: 'Warning',
    });
  }

  // get user with that email
  const user = await models.User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: await hashPassword(body.password),
  });

  console.log({ id: user.id });

  // all good
  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      // username: 'example',
      // role: 'admin',
    },
    title: 'Success',
  });
}
