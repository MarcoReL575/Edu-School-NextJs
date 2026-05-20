// src/features/tasks/schema/tasksSchemas.ts
import { z } from "zod";
import { createInsertSchema } from 'drizzle-zod';
import { tasks } from "@/src/db/schema";

export const CreateTaskSchema = createInsertSchema(tasks, {
    title: (schema)=> schema.min(5, { message: 'Mínimo 5 crarcteres' }).max(25, { message: 'Máximo 25 caracteres' }),
    description: (schema)=> schema.max(250, { message: 'Máximo 250 caracteres' }),
    fechaEntrega: z.coerce.date().refine((date) => date > new Date(), "La fecha de entrega debe de tener al menos 1 día de diferencia con la fecha de creación"), 
}).omit({
    createdAt: true
});

export const AttachmentSchema = z.object({
  fileUrl: z.string().url("La URL del archivo no es válida"),
  fileName: z.string().min(1, "El nombre del archivo es obligatorio"),
  fileType: z.string().min(1, "El tipo de archivo es obligatorio"),
});

export const StudentSubmissionSchema = z.object({
  taskId: z.number({message: "ID de tarea inválido"}),
  studentId: z.string().uuid("ID de estudiante inválido"),
  attachments: z.array(AttachmentSchema)
    .min(1, "Debes adjuntar al menos un archivo o imagen para enviar la tarea"),
});