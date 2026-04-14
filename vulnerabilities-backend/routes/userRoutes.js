import express from "express";
import {login, register, getById} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/userMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getById);

export default router;