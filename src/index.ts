import { Application } from 'express';

import authRoutes from './routes/auth.route';

function routerApi(app: Application) {
  app.use('/api', authRoutes);
  // other routes here
}

export default routerApi;
