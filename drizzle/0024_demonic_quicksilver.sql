CREATE TABLE "parent_students" (
	"parent_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	CONSTRAINT "parent_students_parent_id_student_id_pk" PRIMARY KEY("parent_id","student_id")
);
--> statement-breakpoint
ALTER TABLE "parents" DROP CONSTRAINT "parents_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "parent_students" ADD CONSTRAINT "parent_students_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_students" ADD CONSTRAINT "parent_students_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parents" DROP COLUMN "student_id";