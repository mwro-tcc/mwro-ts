import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { favoriteController } from "../controllers/FavoriteController";

const router = express.Router();

router.delete("/:uuid", authenticationMiddleware(), favoriteController.DeleteByAssetUuid())
router.post("/:assetUuid", authenticationMiddleware(), favoriteController.create());

export default router;
