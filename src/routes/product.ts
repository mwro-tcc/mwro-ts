import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { productController } from "../controllers/ProductController";

const router = express.Router();

router.post("/create", authenticationMiddleware(), productController.create());
router.get("/:uuid", authenticationMiddleware(), productController.findByUuid());
router.put("/:uuid", authenticationMiddleware(), productController.update());
router.delete("/:uuid", authenticationMiddleware(), productController.delete());

export default router;
