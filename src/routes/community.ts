import express from "express";
import { communityController } from "../controllers/CommunityController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.post("/create", authenticationMiddleware(), communityController.create());
router.post("/update", authenticationMiddleware(), communityController.update());

export default router;
