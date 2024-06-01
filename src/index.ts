import { Application } from 'express';

import authRoutes from './routes/auth.route';
import collaboratorRoutes from './routes/collaborator.route';

function routerApi(app: Application) {
  app.use('/api', authRoutes, collaboratorRoutes);
}

export default routerApi;
