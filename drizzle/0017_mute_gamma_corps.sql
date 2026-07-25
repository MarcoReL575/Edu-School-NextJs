CREATE TABLE "class_grades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"clase_id" uuid NOT NULL,
	"final_grade" numeric(5, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "class_grades_student_id_clase_id_unique" UNIQUE("student_id","clase_id")
);
--> statement-breakpoint
ALTER TABLE "class_grades" ADD CONSTRAINT "class_grades_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_grades" ADD CONSTRAINT "class_grades_clase_id_clases_id_fk" FOREIGN KEY ("clase_id") REFERENCES "public"."clases"("id") ON DELETE cascade ON UPDATE no action;