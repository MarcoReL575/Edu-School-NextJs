import z from "zod";
import { insertExamSchema, questionSchema, selectExamSchema } from "../schemas/schema";

// Tipo de TypeScript inferido para mayor seguridad
export type InsertExam = z.infer<typeof insertExamSchema>;
export type SelectExam = z.infer<typeof selectExamSchema>;


export type InsertExamWithQuestions = z.infer<typeof insertExamSchema>;
export type QuestionsExam = z.infer<typeof questionSchema>;
