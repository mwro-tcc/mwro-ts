import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { storeController } from "../controllers/StoreController";

const router = express.Router();

router.post("/create", authenticationMiddleware(), storeController.create());

export default router;
