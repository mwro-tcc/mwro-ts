import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { storeController } from "../controllers/StoreController";

const router = express.Router();

router.post("/", authenticationMiddleware(), storeController.create());
router.put("/:uuid", authenticationMiddleware(), storeController.update());
router.get("/:uuid", authenticationMiddleware(), storeController.findByUuid());
router.delete("/:uuid", authenticationMiddleware(), storeController.findByUuid());
router.get("/:uuid/products", authenticationMiddleware(), storeController.listProducts());

export default router;
