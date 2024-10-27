import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { reviewController } from "../controllers/ReviewController";

const router = express.Router();

router.delete("/:uuid", authenticationMiddleware(), reviewController.DeleteByAssetUuid())
router.get("/:assetUuid", authenticationMiddleware(), reviewController.listReviewsFromAsset());
router.post("/:assetUuid", authenticationMiddleware(), reviewController.create());

export default router;
