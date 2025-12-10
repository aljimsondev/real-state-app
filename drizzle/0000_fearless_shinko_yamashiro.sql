CREATE TYPE "public"."listing_category" AS ENUM('sale', 'rent', 'lease');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('active', 'pending', 'sold', 'rented', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('house', 'apartment', 'condo', 'townhouse', 'land', 'commercial', 'industrial');--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "favorites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"listing_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "listing" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "listing_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"listing_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"user_id" uuid NOT NULL,
	"property_type" "property_type" NOT NULL,
	"category" "listing_category" NOT NULL,
	"status" "listing_status" DEFAULT 'active' NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"country" varchar(100) DEFAULT 'Philippines' NOT NULL,
	"postal_code" varchar(20),
	"geolocation" jsonb DEFAULT '{"lat":0,"lng":0}'::jsonb,
	"price" numeric(15, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'PHP' NOT NULL,
	"price_per_sqm" numeric(10, 2),
	"bedrooms" integer,
	"bathrooms" numeric(3, 1),
	"floor_area" numeric(10, 2),
	"lot_area" numeric(10, 2),
	"parking_spaces" integer DEFAULT 0,
	"floors" integer,
	"year_built" integer,
	"features" jsonb DEFAULT '[]'::jsonb,
	"amenities" jsonb DEFAULT '[]'::jsonb,
	"images" jsonb DEFAULT '[]'::jsonb,
	"video_tour_url" varchar(500),
	"virtual_tour_url" varchar(500),
	"is_featured" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"favorite_count" integer DEFAULT 0,
	"contact_name" varchar(255),
	"contact_phone" varchar(50),
	"contact_email" varchar(255),
	"slug" varchar(300),
	"meta_title" varchar(255),
	"meta_description" text,
	"published_at" timestamp,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "listing_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "listing" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" varchar(255),
	"avatar_url" text,
	"phone" varchar(50),
	"email" varchar(50),
	"bio" text,
	"is_agent" boolean DEFAULT false,
	"is_public" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing" ADD CONSTRAINT "listing_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_listing_user_id" ON "listing" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_listing_status" ON "listing" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_listing_category" ON "listing" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_listing_city" ON "listing" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_listing_price" ON "listing" USING btree ("price");--> statement-breakpoint
CREATE INDEX "idx_listing_property_type" ON "listing" USING btree ("property_type");--> statement-breakpoint
CREATE INDEX "idx_listing_created_at" ON "listing" USING btree ("created_at");--> statement-breakpoint
CREATE POLICY "User can view their favourites" ON "favorites" AS RESTRICTIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "User can update their own favourites" ON "favorites" AS RESTRICTIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "User can delete their own favorites" ON "favorites" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "Users can view listings" ON "listing" AS RESTRICTIVE FOR SELECT TO public USING (status = 'active');--> statement-breakpoint
CREATE POLICY "User can edit their own listing" ON "listing" AS PERMISSIVE FOR UPDATE TO "authenticated" WITH CHECK ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "User can insert new listing" ON "listing" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "User can delete their listing" ON "listing" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = user_id);--> statement-breakpoint
CREATE POLICY "User profile can be viewed publictly" ON "profiles" AS RESTRICTIVE FOR SELECT TO public USING (is_public = true);--> statement-breakpoint
CREATE POLICY "User can view their own profile" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = id);--> statement-breakpoint
CREATE POLICY "User can update their own profile" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id);--> statement-breakpoint
CREATE POLICY "User can delete their own profile" ON "profiles" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = id);