import express from 'express';
import {create, deleteById, getAll, getById, update} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/userMiddleware.js";

const route = express.Router();

route.use(authMiddleware);

route.post("/", authMiddleware, create);
route.get("/all", authMiddleware, getAll);
route.get("/:id", authMiddleware, getById);
route.put("/update/:id", authMiddleware, update);
route.delete("/delete/:id", authMiddleware, deleteById);

export default route;