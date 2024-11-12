ALTER TABLE "admin_subscriptions" ALTER COLUMN "creationEventUuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_subscriptions" ADD COLUMN "cancelationEventUuid" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_subscriptions" ADD CONSTRAINT "admin_subscriptions_cancelationEventUuid_stripe_events_uuid_fk" FOREIGN KEY ("cancelationEventUuid") REFERENCES "stripe_events"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
