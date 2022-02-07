import { Router } from "express";
import authMiddleware from "../middleware/AuthMiddleware";
import clienteRoutes from "./cliente.routes";
import funcionarioRoutes from "./funcionario.routes";
import userRoutes from "./user.routes";

const routes = Router();
routes.use('/clientes', authMiddleware, clienteRoutes)
routes.use('/funcionarios', authMiddleware, funcionarioRoutes)
routes.use('/users', userRoutes)

export default routes;