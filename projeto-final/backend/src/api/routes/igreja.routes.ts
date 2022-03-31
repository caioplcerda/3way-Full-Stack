import { Router } from "express";
import IgrejaController from "../controller/IgrejaController";
// import authMiddleware from "../middleware/authMiddleware";

const igrejaRoutes = Router();

igrejaRoutes.get("/", IgrejaController.findAll);
igrejaRoutes.get("/:id", IgrejaController.findId);
igrejaRoutes.post("/", IgrejaController.create);
igrejaRoutes.put("/:id", IgrejaController.update);
igrejaRoutes.delete("/:id", IgrejaController.delete);


export default igrejaRoutes;