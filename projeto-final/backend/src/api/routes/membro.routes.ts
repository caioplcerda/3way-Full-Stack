import { Router } from "express";
import MembroController from "../controller/MembroController";
// import authMiddleware from "../middleware/authMiddleware";

const membroRoutes = Router();

membroRoutes.get("/", MembroController.findAll);
membroRoutes.get("/:id", MembroController.findId);
membroRoutes.post("/", MembroController.create);
membroRoutes.put("/:id", MembroController.update);
membroRoutes.delete("/:id", MembroController.delete);


export default membroRoutes;