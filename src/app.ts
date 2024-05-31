import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import routerApi from './index';

const db = require('../models');

import { errorHandler } from '../helpers/errorHandler';

try {
  //For env File
  dotenv.config();

  const app: Application = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Puerto de la app
  const port = process.env.PORT || 3000;

  routerApi(app);

  app.use(errorHandler);

  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
