import { Router } from "express";
import AuthControler from "../controller/AuthControler";
import UserController from "../controller/UserController";
import authMiddleware from "../middleware/AuthMiddleware";

const userRoutes = Router();

userRoutes.post('/', authMiddleware, UserController.create);
userRoutes.get('/', UserController.findAll);
userRoutes.post('/auth', AuthControler.authenticate);

export default userRoutes;