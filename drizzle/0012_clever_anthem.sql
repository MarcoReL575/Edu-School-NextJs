CREATE TABLE "exam_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"score" numeric(5, 2),
	"status" varchar(30) DEFAULT 'en_progreso' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"submitted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "exam_submissions" ADD CONSTRAINT "exam_submissions_exam_id_exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_submissions" ADD CONSTRAINT "exam_submissions_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;