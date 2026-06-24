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
    questionText: z.string().min(1, "La pregunta es requerida"),
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
    status: z.string().refine((val) => ["activo", "inactivo"].includes(val), {
        message: "El status debe ser activo o inactivo",
    }),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const insertExamSchema = baseExamSchema.extend({
    questions: z.array(questionSchema).min(1, "El examen debe tener al menos una pregunta"),
});

// 1. Opciones seguras para el alumno (Omitimos 'isCorrect' por seguridad)
export const studentOptionSchema = z.object({
    id: z.string().uuid(), // El ID es necesario para que el alumno pueda seleccionar la opción
    text: z.string(),
});

// 2. Preguntas seguras para el alumno
export const studentQuestionSchema = z.object({
    id: z.string().uuid(),
    questionText: z.string(),
    type: z.enum(["multiple", "open"]),
    points: z.number().int(),
    options: z.array(studentOptionSchema), // Usa las opciones protegidas
});

// 3. Esquema completo del Examen listo para el Alumno
export const studentExamRenderSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    subjectName: z.string(),
    groupId: z.string(),
    status: z.string(),
    questions: z.array(studentQuestionSchema), // Estructura de preguntas anidadas seguras
});