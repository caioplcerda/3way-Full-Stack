import { Router } from "express";
import PastorController from "../controller/PastorController";
// import authMiddleware from "../middleware/authMiddleware";

const pastorRoutes = Router();

pastorRoutes.get("/", PastorController.findAll);
pastorRoutes.get("/:id", PastorController.findId);
pastorRoutes.post("/", PastorController.create);
pastorRoutes.put("/:id", PastorController.update);
pastorRoutes.delete("/:id", PastorController.delete);


export default pastorRoutes;