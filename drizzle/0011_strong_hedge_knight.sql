CREATE TABLE IF NOT EXISTS "images" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assetUuid" uuid NOT NULL,
	"content" "bytea" NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
