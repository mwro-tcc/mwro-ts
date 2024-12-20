import express from "express";
import { authenticationMiddleware } from "../middlewares/auth/auth";
import { storeController } from "../controllers/StoreController";

const router = express.Router();

router.post("/", authenticationMiddleware(), storeController.create());
router.get("/", authenticationMiddleware(), storeController.search());
router.get("/mine", authenticationMiddleware(), storeController.listMyStores());
router.get("/favorites", authenticationMiddleware(), storeController.listFavoriteStores());
router.put("/:uuid", authenticationMiddleware(), storeController.update());
router.get("/:uuid", authenticationMiddleware(), storeController.findByUuid());
router.delete("/:uuid", authenticationMiddleware(), storeController.delete());
router.get("/:uuid/products", authenticationMiddleware(), storeController.listProducts());

export default router;
