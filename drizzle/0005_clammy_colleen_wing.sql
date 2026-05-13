ALTER TABLE "tasks" DROP CONSTRAINT "tasks_subject_id_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_teacher_id_teachers_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "subject_id";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "teacher_id";