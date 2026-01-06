ALTER TABLE "pets" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."pet_type";--> statement-breakpoint
CREATE TYPE "public"."pet_type" AS ENUM('dog', 'cat');--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "type" SET DATA TYPE "public"."pet_type" USING "type"::"public"."pet_type";