CREATE TABLE IF NOT EXISTS "communities" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"isPrivate" boolean DEFAULT false NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
