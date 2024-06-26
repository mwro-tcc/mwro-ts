import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { productController } from "../controllers/ProductController";

const router = express.Router();

router.post("/create", authenticationMiddleware(), productController.create());
router.get("/:uuid", authenticationMiddleware(), productController.findByUuid());
router.put("/update/:uuid", authenticationMiddleware(), productController.update());
router.delete("/delete/:uuid", authenticationMiddleware(), productController.delete());

export default router;
