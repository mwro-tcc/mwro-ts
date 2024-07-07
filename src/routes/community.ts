import express from "express";
import { communityController } from "../controllers/CommunityController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.get("/created", authenticationMiddleware(), communityController.listCreatedByUser());
router.get("/:uuid", authenticationMiddleware(), communityController.findByUuid());
router.get("/:uuid/products", authenticationMiddleware(), communityController.listProducts());
router.post("/", authenticationMiddleware(), communityController.create());
router.put("/:uuid", authenticationMiddleware(), communityController.update());
router.delete("/:uuid", authenticationMiddleware(), communityController.delete());

export default router;
