// src/features/tasks/schema/tasksSchemas.ts
import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(100, "El título es demasiado largo"),
    description: z.string().min(10, "Describe mejor la tarea para tus alumnos"),
    fechaEntrega: z.string().or(z.date()).refine((date) => {
        return new Date(date) > new Date();
    }, "La fecha de entrega debe ser en el futuro"),
  
    claseId: z.string().uuid("Selecciona una clase válida"),
});