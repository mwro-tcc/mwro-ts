import express from "express";
import { communityController } from "../controllers/CommunityController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.get("/", authenticationMiddleware(), communityController.listRequests());
router.post("/", authenticationMiddleware(), communityController.createRequest());
router.put("/:uuid", authenticationMiddleware(), communityController.updateRequestStatus());

export default router;
