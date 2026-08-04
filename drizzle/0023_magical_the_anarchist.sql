ALTER TABLE "teachers" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_slug_unique" UNIQUE("slug");