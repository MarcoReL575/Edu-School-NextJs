ALTER TABLE "exams" RENAME COLUMN "subject_id" TO "subject_name";--> statement-breakpoint
ALTER TABLE "exams" DROP CONSTRAINT "exams_subject_id_subjects_id_fk";
