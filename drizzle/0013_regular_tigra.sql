ALTER TABLE "images" ADD COLUMN "format" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN IF EXISTS "mimetype";