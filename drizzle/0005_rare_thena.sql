CREATE TABLE IF NOT EXISTS "stores" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userUuid" uuid NOT NULL,
	"communityUuid" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"createdAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores" ADD CONSTRAINT "stores_userUuid_users_uuid_fk" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores" ADD CONSTRAINT "stores_communityUuid_communities_uuid_fk" FOREIGN KEY ("communityUuid") REFERENCES "communities"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
