import express from "express";
import { communityRequestsController } from "../controllers/CommunityRequestsController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.get("/my-communities", authenticationMiddleware(), communityRequestsController.listUserCommunitiesPendingRequests());
router.get("/my-stores", authenticationMiddleware(), communityRequestsController.listUserStoresPendingRequests());
router.post("/", authenticationMiddleware(), communityRequestsController.createRequest());
router.put("/:uuid", authenticationMiddleware(), communityRequestsController.updateRequestStatus());

export default router;
