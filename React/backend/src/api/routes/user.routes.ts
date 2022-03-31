import { Router } from "express";
import AuthControler from "../controller/AuthControler";
import userControler from "../controller/userControler";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.get('/', authMiddleware, userControler.findAll);
userRoutes.post('/register', userControler.register);
userRoutes.post('/auth', AuthControler.authenticate);

export default userRoutes