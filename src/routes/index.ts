import express from "express";
import userRouter from "./user";
import communityRouter from "./community";
import productRouter from "./product";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Testing response");
});

router.use("/user", userRouter);
router.use("/community", communityRouter);
router.use("/product", productRouter);

export default router;
