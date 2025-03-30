ALTER TABLE "admin_subscriptions" ALTER COLUMN "userUuid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_subscriptions" ALTER COLUMN "startsAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_subscriptions" ALTER COLUMN "expiresAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "admin_subscriptions" ALTER COLUMN "expiresAt" DROP NOT NULL;