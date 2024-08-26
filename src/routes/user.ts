import express from "express";
import { userController } from "../controllers/UserController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.post("/sign-up", userController.signUp());
router.post("/sign-in", userController.signIn());
router.get("/me", authenticationMiddleware(), userController.me());
router.put("/", authenticationMiddleware(), userController.update());
router.delete("/", authenticationMiddleware(), userController.deleteAccount());
router.get("/:uuid", authenticationMiddleware(), userController.findById());

export default router;
