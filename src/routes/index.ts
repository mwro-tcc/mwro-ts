import express from "express";
import userRouter from "./user";
import communityRouter from "./community";
import productRouter from "./product";
import storeRouter from "./store";
import { loggingMiddleware } from "../middlewares/logger";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Welcome to mwro API!");
});

router.use("/users", loggingMiddleware(), userRouter);
router.use("/communities", loggingMiddleware(), communityRouter);
router.use("/products", loggingMiddleware(), productRouter);
router.use("/stores", loggingMiddleware(), storeRouter);

export default router;
