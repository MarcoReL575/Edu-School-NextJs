ALTER TABLE "clases" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "clases" ADD CONSTRAINT "clases_slug_unique" UNIQUE("slug");