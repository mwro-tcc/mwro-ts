ALTER TABLE "products" ADD COLUMN "storeUuid" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_storeUuid_stores_uuid_fk" FOREIGN KEY ("storeUuid") REFERENCES "stores"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
