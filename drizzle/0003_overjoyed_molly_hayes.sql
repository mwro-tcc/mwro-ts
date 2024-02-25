ALTER TABLE "communitiesAdmins" RENAME TO "communities_admins";--> statement-breakpoint
ALTER TABLE "communities_admins" DROP CONSTRAINT "communitiesAdmins_userUuid_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "communities_admins" DROP CONSTRAINT "communitiesAdmins_communityUuid_communities_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities_admins" ADD CONSTRAINT "communities_admins_userUuid_users_uuid_fk" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "communities_admins" ADD CONSTRAINT "communities_admins_communityUuid_communities_uuid_fk" FOREIGN KEY ("communityUuid") REFERENCES "communities"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
