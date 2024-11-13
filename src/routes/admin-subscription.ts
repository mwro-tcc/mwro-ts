import express from "express";
import { adminSubscriptionController } from "../controllers/AdminSubscriptionController";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();

router.get("/active", authenticationMiddleware(), adminSubscriptionController.getMyActiveSubscription());

export default router;
