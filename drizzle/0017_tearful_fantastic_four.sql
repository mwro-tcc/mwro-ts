CREATE TABLE IF NOT EXISTS "stripe_events" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event" jsonb,
	"createdAt" time DEFAULT now() NOT NULL
);
