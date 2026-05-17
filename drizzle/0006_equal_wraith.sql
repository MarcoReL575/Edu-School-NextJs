CREATE TYPE "public"."task_status" AS ENUM('pendiente', 'en progreso', 'terminada');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "task_status" DEFAULT 'pendiente' NOT NULL;