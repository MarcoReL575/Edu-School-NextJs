import z from "zod";
import { baseExamSchema, insertExamSchema, questionSchema } from "../schemas/schema";
import { examQuestionOptions, examQuestions, exams } from "@/src/db/schema/examen-schema";

// Tipo de TypeScript inferido para mayor seguridad
export type InsertExam = typeof exams.$inferInsert
export type SelectExam = typeof exams.$inferSelect

export type InsertExamWithQuestions = z.infer<typeof insertExamSchema>;
export type QuestionsExam = z.infer<typeof questionSchema>;

export type SelectQuestions = typeof examQuestions.$inferSelect;
export type InsertQuestions = typeof examQuestions.$inferInsert;

export type SelectOptions = typeof examQuestionOptions.$inferSelect;
export type InsertOptions = typeof examQuestionOptions.$inferInsert;

export type ExamSelectInfo = {
    id: string;
    title: string;
    subjectName: string;
    grade: string | null;
    group: string | null;
    level: string | null;
    status: string;
    createdAt: Date;
    questionsCount: number;
    totalStudents: number;
    submittedCount: number;
    averageScore: number;
}

export type ExamStudentInfo = {
    id: string;
    slug: string;
    title: string;
    subjectName: string;
    grade: string | null;
    groupName: string | null;
    level: string | null;
    status: string;
    createdAt: Date;
    questionsCount: number;
    studentSubmissionStatus: string | null;
    studentScore: string | null;
    submittedAt: Date | null;
} 