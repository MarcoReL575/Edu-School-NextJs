ALTER TABLE "task_attachment" RENAME TO "task_attachments";--> statement-breakpoint
ALTER TABLE "task_attachments" DROP CONSTRAINT "task_attachment_taskSubmission_id_task_submissions_id_fk";
--> statement-breakpoint
ALTER TABLE "task_attachments" ADD CONSTRAINT "task_attachments_taskSubmission_id_task_submissions_id_fk" FOREIGN KEY ("taskSubmission_id") REFERENCES "public"."task_submissions"("id") ON DELETE no action ON UPDATE no action;