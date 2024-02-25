import express from "express";
import { userController } from "../controllers/UserController";

const router = express.Router();

router.post("/sign-up", userController.signUp());
router.post("/sign-in", userController.signIn());

export default router;
