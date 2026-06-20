ALTER TABLE "exams" RENAME COLUMN "subject_name" TO "subject_id";--> statement-breakpoint
ALTER TABLE "exams" RENAME COLUMN "group" TO "group_id";--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE no action ON UPDATE no action;