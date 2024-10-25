CREATE TABLE IF NOT EXISTS "reviews" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assetUuid" uuid NOT NULL,
	"userUuid" uuid NOT NULL,
	"score" integer NOT NULL,
	"comment" text,
	"createdAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userUuid_users_uuid_fk" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
