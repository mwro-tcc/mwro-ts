import express from "express";
import { userController } from "../controllers/UserController";

const router = express.Router();

router.get('/sign-up', userController.signUp())

export default router
