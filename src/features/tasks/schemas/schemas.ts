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
})