import { Router } from "express";
import AuthControler from "../controller/AuthControler";
import UserController from "../controller/UserController";
import AuthMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.get('/', AuthMiddleware, UserController.findAll);
userRoutes.post('/', UserController.create);
userRoutes.post('/auth', AuthControler.authenticate);

export default userRoutes;