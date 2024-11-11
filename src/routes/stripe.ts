import express from "express";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { makePgStripeEventAdapter } from "../infra/database/stripeEvent";

const envValues = getEnvValues()

// @ts-ignore
const stripe = require("stripe")(envValues.STRIPE_SECRET_KEY)

const router = express.Router();
const stripeEventAdapter = makePgStripeEventAdapter()


router.post("/webhook", (req, res, next) => {
    // const signature = req.headers['stripe-signature'];
    // const event = Stripe.webhooks.constructEvent(req.body, signature, envValues.STRIPE_SECRET_KEY);
    // stripeEventAdapter.create({ event: event })
    // res.status(200).send()
})

export default router;
