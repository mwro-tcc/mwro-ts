
import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { imageController } from "../controllers/ImageController";

// @ts-ignore
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({ storage })


const router = express.Router();

router.get("/:uuid", authenticationMiddleware(), imageController.findByAssetUuid())
router.post("/:assetUuid", authenticationMiddleware(), upload.single('image'), imageController.create());

export default router;
