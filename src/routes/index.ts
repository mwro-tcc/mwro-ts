import express from "express";
import userRouter from "./user";
import communityRouter from "./community";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Testing response");
});

router.use("/user", userRouter);
router.use("/community", communityRouter);

export default router;
