CREATE TABLE IF NOT EXISTS "products" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"price" real NOT NULL,
	"stock" real NOT NULL,
	"description" text,
	"createdAt" date DEFAULT now() NOT NULL
);
