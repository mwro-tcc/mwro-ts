import express from "express";
import userRouter from "./user";
import communityRouter from "./community";
import productRouter from "./product";
import storeRouter from "./store";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Welcome to mwro API!");
});

router.use("/users", userRouter);
router.use("/communities", communityRouter);
router.use("/products", productRouter);
router.use("/stores", storeRouter);

export default router;
