CREATE TABLE IF NOT EXISTS "users" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"salt" varchar(256) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
