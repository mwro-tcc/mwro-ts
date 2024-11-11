import express from "express";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { makePgStripeEventAdapter } from "../infra/database/stripeEvent";
import stripePkg from "stripe"

const router = express.Router();
const envValues = getEnvValues()
const stripeEventAdapter = makePgStripeEventAdapter()

// @ts-ignore
const stripe = stripePkg(envValues.STRIPE_SECRET_KEY)

router.post("/webhook", express.raw({ type: 'application/json' }), (req, res, next) => {
    const signature = req.headers['stripe-signature'];
    const secret = envValues.STRIPE_WEBHOOK_SECRET_KEY;
    // @ts-ignore
    const event = stripe.webhooks.constructEvent(req.body, signature, secret);
    stripeEventAdapter.create({ event: event })
    res.status(200).send()
})

export default router;
