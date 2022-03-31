import { Router } from "express";
import AuthController from "../controller/AuthController";
import UserController from "../controller/UserController";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, UserController.findAll);
userRoutes.post("/register", UserController.register);
userRoutes.post("/auth", AuthController.authenticate);

export default userRoutes;