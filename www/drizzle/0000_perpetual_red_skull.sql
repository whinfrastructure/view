CREATE TYPE "public"."listing_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"listing_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"address" text,
	"city" varchar(100),
	"country" varchar(100) DEFAULT 'France',
	"latitude" varchar(50),
	"longitude" varchar(50),
	"bedrooms" integer DEFAULT 1 NOT NULL,
	"bathrooms" integer DEFAULT 1 NOT NULL,
	"max_guests" integer DEFAULT 2 NOT NULL,
	"surface" integer,
	"amenities" json DEFAULT '[]'::json,
	"house_rules" json DEFAULT '{"pets":false,"smoking":false,"parties":false,"checkIn":"15:00","checkOut":"11:00"}'::json,
	"images" json DEFAULT '[]'::json,
	"cover_image" text,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;