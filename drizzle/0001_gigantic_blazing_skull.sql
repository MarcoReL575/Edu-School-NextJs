ALTER TABLE "submissions" RENAME TO "task_submissions";--> statement-breakpoint
ALTER TABLE "task_attachments" DROP CONSTRAINT "task_attachments_taskSubmission_id_submissions_id_fk";
--> statement-breakpoint
ALTER TABLE "task_submissions" DROP CONSTRAINT "submissions_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "task_submissions" DROP CONSTRAINT "submissions_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "task_attachments" ADD CONSTRAINT "task_attachments_taskSubmission_id_task_submissions_id_fk" FOREIGN KEY ("taskSubmission_id") REFERENCES "public"."task_submissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_submissions" ADD CONSTRAINT "task_submissions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_submissions" ADD CONSTRAINT "task_submissions_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;