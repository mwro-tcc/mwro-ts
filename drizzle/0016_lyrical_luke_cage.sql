DO $$ BEGIN
 CREATE TYPE "requeststatus" AS ENUM('approved', 'pending', 'denied');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "communities_requests" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storeUuid" uuid NOT NULL,
	"communityUuid" uuid NOT NULL,
	"status" "requeststatus" DEFAULT 'pending' NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"reviewedByUser" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities_requests" ADD CONSTRAINT "communities_requests_storeUuid_stores_uuid_fk" FOREIGN KEY ("storeUuid") REFERENCES "stores"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities_requests" ADD CONSTRAINT "communities_requests_communityUuid_communities_uuid_fk" FOREIGN KEY ("communityUuid") REFERENCES "communities"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities_requests" ADD CONSTRAINT "communities_requests_reviewedByUser_users_uuid_fk" FOREIGN KEY ("reviewedByUser") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
