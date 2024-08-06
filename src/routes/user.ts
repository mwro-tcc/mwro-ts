import express from "express";
import { userController } from "../controllers/UserController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.post("/sign-up", userController.signUp());
router.post("/sign-in", userController.signIn());
router.put("/", authenticationMiddleware(), userController.update());
router.get("/:uuid", authenticationMiddleware(), userController.findById());

export default router;
