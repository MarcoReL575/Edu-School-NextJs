import { pgTable, uuid, bigint, text, timestamp } from "drizzle-orm/pg-core";
import { tasks } from "./tasks-schema";
import { students } from "./studentsSchema";

export const taskSubmission = pgTable("task_submissions", {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: bigint("task_id", { mode: "number" }).references(() => tasks.id).notNull(),
    studentId: uuid("student_id").references(() => students.id).notNull(),
    
    // Estado de LA ENTREGA del alumno
    status: text("status").$type<"pendiente" | "entregada" | "calificada" | "retrasada">().default("pendiente"),
    
    submittedAt: timestamp("submitted_at"), // Nulo hasta que suba la tarea
    
    // Evaluación del Maestro
    calificacion: text("calificacion").default('Sin calificación').notNull(), // Puede ser número "90" 
    feedback: text("feedback").default('Sin comentarios').notNull(), // Los comentarios del maestro
});