import { ApiError, compareHashedPassword } from '../../helpers';

const auth = require('basic-auth');

const models = require('../../models');

const basicAuth = async (req: any, res: any, next: any) => {
  const credentials = await auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    throw new ApiError({
      statusCode: 403,
      message: 'Forbidden',
      title: 'You need to sign In',
    });
  }

  next();
};

async function check(email: string, password: string) {
  const user = await models.User.findOne({ where: { email } });

  if (!user) return false;

  const result = await compareHashedPassword(password, user.password);

  return result;
}

export default basicAuth;
