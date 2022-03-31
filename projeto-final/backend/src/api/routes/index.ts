import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import igrejaRoutes from './igreja.routes';
import membroRoutes from './membro.routes';
import pastorRoutes from './pastor.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/igrejas", authMiddleware, igrejaRoutes);
routes.use("/pastores", authMiddleware, pastorRoutes);
routes.use("/membros", authMiddleware, membroRoutes);

export default routes;