import express from "express";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { makePgStripeEventAdapter } from "../infra/database/stripeEvent";
import stripePkg from "stripe";
import { StripeWebhookEventType } from "../database/schema/stripe-events";
import { makePgAdminSubscriptionsAdapter } from "../infra/database/admin-subscription";
import { authenticationMiddleware } from "../middlewares/auth/auth";

const router = express.Router();
const envValues = getEnvValues();
const stripeEventAdapter = makePgStripeEventAdapter();
const adminSubscriptionAdapter = makePgAdminSubscriptionsAdapter();

// @ts-ignore
const stripe = stripePkg(envValues.STRIPE_SECRET_KEY);

router.post("/checkout-session", authenticationMiddleware(), async (req, res, next) => {
    const { id } = req.user;

    const session = await stripe.checkout.sessions
        .create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: "price_1QJvzcP7sqyH9Y3ciWQiGAPu", quantity: 1 }],
            success_url: "https://www.google.com",
            cancel_url: "https://www.google.com",
            client_reference_id: id,
        })
        .catch((e: any) => {
            res.status(500).send({
                error: "internal server error while attempting to create checkout session",
            });
            next(e);
        });

    res.status(200).send({ id: session.id, url: session.url });
});

router.post("/webhook", express.raw({ type: "application/json" }), (req, res, next) => {
    const signature = req.headers["stripe-signature"];
    const secret = envValues.STRIPE_WEBHOOK_SECRET_KEY;

    // @ts-ignore
    const event = stripe.webhooks.constructEvent(req.body, signature, secret);

    handleEvent(event).catch(console.log);

    res.status(200).send();
});

async function handleEvent(event: any) {
    const createdEvent = await stripeEventAdapter.create({
        event: event,
        eventId: event?.id,
    });

    const userUuid = event?.data?.object?.metadata?.userUuid;

    switch (event.type) {
        case StripeWebhookEventType.CustomerSubscriptionCreated: {
            await adminSubscriptionAdapter.create({
                userUuid,
                creationEventUuid: createdEvent?.uuid,
                objectId: event?.data?.object?.id,
                startsAt: new Date(event?.data?.object?.current_period_start * 1000),
                expiresAt: new Date(event?.data?.object?.current_period_end * 1000),
            });
            break;
        }

        case StripeWebhookEventType.CustomerSubscriptionDeleted: {
            const objectId = event?.data?.object?.id;
            await adminSubscriptionAdapter.updateByObjectId(objectId, {
                cancelationEventUuid: createdEvent?.uuid,
            });
            break;
        }
        default:
    }
}

export default router;
