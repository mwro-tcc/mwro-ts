import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";
import { AdminSubscription } from "../schema/admin-subscriptions";
import { StripeEvent } from "../schema/stripe-events";
import { makePgStripeEventAdapter } from "../../infra/database/stripeEvent";
import { makePgAdminSubscriptionsAdapter } from "../../infra/database/admin-subscription";

const mockDate = new Date("1950-01-01")
const event: StripeEvent = {
    uuid: "5632505d-85de-41db-ac62-ef84cdfb7b64",
    createdAt: mockDate,
    event: { foo: "bar" },
    eventId: "qlqr-id-de-evento-stripe"

}
const subscriptions: AdminSubscription[] = [
    {
        uuid: "d12ade59-f4d3-4e49-85fb-dca2e8487882",
        objectId: "id-qlqr-de-subscription",
        startsAt: mockDate,
        expiresAt: new Date("3000-01-01"),
        userUuid: TestDatabaseCommonValues.user1.uuid,
        createdAt: mockDate,
        creationEventUuid: event.uuid,
        cancelationEventUuid: null
    },
];

export async function populate(db: NodePgDatabase) {
    const stripeEventAdapter = makePgStripeEventAdapter(db);
    await stripeEventAdapter.create(event)

    const adminSubscriptionAdapter = makePgAdminSubscriptionsAdapter(db)
    await adminSubscriptionAdapter.bulkCreate(subscriptions)
}
