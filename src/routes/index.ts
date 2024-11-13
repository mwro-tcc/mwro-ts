import express from "express";
import userRouter from "./user";
import communityRouter from "./community";
import productRouter from "./product";
import storeRouter from "./store";
import imagesRouter from "./image";
import favoritesRouter from "./favorite";
import reviewsRouter from "./review";
import communitiesRequestsRouter from "./requests";
import stripeRouter from "./stripe";
import adminSubscriptionsRouter from "./admin-subscription";

import { loggingMiddleware } from "../middlewares/logger";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Welcome to mwro API!");
});

router.use("/users", loggingMiddleware(), userRouter);
router.use("/communities", loggingMiddleware(), communityRouter);
router.use("/products", loggingMiddleware(), productRouter);
router.use("/stores", loggingMiddleware(), storeRouter);
router.use("/images", loggingMiddleware(), imagesRouter);
router.use("/favorites", loggingMiddleware(), favoritesRouter);
router.use("/reviews", loggingMiddleware(), reviewsRouter);
router.use("/communities-requests", loggingMiddleware(), communitiesRequestsRouter);
router.use("/stripe", loggingMiddleware(), stripeRouter);
router.use("/admin-subscriptions", loggingMiddleware(), adminSubscriptionsRouter);


export default router;
