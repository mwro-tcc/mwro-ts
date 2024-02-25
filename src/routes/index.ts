import express from "express";
import userRouter from "./user";

const router = express.Router();

router.get("/", (_, res) => {
    res.send("Testing response");
});

router.use("/user", userRouter);

export default router;
