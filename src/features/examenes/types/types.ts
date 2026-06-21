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