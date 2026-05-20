CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" bigint NOT NULL,
	"student_id" uuid NOT NULL,
	"status" text DEFAULT 'pendiente',
	"submitted_at" timestamp,
	"calificacion" text,
	"feedback" text
);
--> statement-breakpoint
ALTER TABLE "task_attachments" RENAME COLUMN "task_id" TO "taskSubmission_id";--> statement-breakpoint
ALTER TABLE "task_attachments" DROP CONSTRAINT "task_attachments_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_attachments" ADD CONSTRAINT "task_attachments_taskSubmission_id_submissions_id_fk" FOREIGN KEY ("taskSubmission_id") REFERENCES "public"."submissions"("id") ON DELETE no action ON UPDATE no action;