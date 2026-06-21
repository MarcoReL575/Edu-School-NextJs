import { exams } from "@/src/db/schema/examen-schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Esquema para selección (útil para respuestas de API)
export const selectExamSchema = createSelectSchema(exams);

// 1. Esquema para las opciones de una pregunta
export const optionSchema = z.object({
    text: z.string().min(1, "El texto es obligatorio"),
    isCorrect: z.boolean(),
});

// 2. Esquema para una pregunta (que contiene múltiples opciones)
export const questionSchema = z.object({
    question_text: z.string().min(1, "La pregunta es requerida"),
    type: z.enum(["multiple", "open"]),
    points: z.number().int().min(1, "Debe valer al menos 1 punto"),
    options: z.array(z.object({
        text: z.string().min(1, "La opción no puede estar vacía"),
        isCorrect: z.boolean(),
  } )).min(2, "Debes agregar al menos 2 opciones"),
});

// 3. Esquema principal del Examen
export const baseExamSchema = createInsertSchema(exams, {
    title: z.string().min(1, "El título es requerido").max(255),
    status: z.enum(["activo", "inactivo"]),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const insertExamSchema = baseExamSchema.extend({
    questions: z.array(questionSchema).min(1, "El examen debe tener al menos una pregunta"),
});