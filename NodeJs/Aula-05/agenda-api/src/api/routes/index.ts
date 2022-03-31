import { Router } from "express";
import AuthMiddleware from "../middleware/authMiddleware";
import clienteRoutes from "./cliente.routes";
import funcionarioRoutes from "./funcionario.routes";
import userRoutes from "./user.routes";

const routes = Router();
routes.use('/clientes', AuthMiddleware, clienteRoutes)
routes.use('/funcionarios', AuthMiddleware, funcionarioRoutes)
routes.use('/users', userRoutes)

export default routes;