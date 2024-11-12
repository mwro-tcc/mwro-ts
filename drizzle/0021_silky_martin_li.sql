ALTER TABLE "stripe_events" ADD COLUMN "eventId" varchar;--> statement-breakpoint
ALTER TABLE "stripe_events" ADD CONSTRAINT "stripe_events_eventId_unique" UNIQUE("eventId");