CREATE TABLE IF NOT EXISTS "admin_subscriptions" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userUuid" uuid NOT NULL,
	"objectId" varchar NOT NULL,
	"startsAt" timestamp NOT NULL,
	"creationEventUuid" uuid,
	"expiresAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_subscriptions" ADD CONSTRAINT "admin_subscriptions_userUuid_users_uuid_fk" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_subscriptions" ADD CONSTRAINT "admin_subscriptions_creationEventUuid_stripe_events_uuid_fk" FOREIGN KEY ("creationEventUuid") REFERENCES "stripe_events"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
