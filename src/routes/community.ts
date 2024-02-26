import express from "express";
import { communityController } from "../controllers/CommunityController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.get("/created", authenticationMiddleware(), communityController.listCreatedByUser());
router.post("/create", authenticationMiddleware(), communityController.create());
router.put("/update/:uuid", authenticationMiddleware(), communityController.update());
router.delete("/delete/:uuid", authenticationMiddleware(), communityController.delete());

export default router;
