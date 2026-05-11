import { pgEnum, pgTable, text, time, uuid } from "drizzle-orm/pg-core";
import { clases } from "./clasesSchemas";


export const dayOfWeekEnum = pgEnum('day_of_week', ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'])

export const horarios = pgTable('horarios', {
    id: uuid("id").primaryKey().defaultRandom(),
    dayOfWeek: dayOfWeekEnum('dia').notNull(),
    startTime: time('inicio').notNull(),
    endTime: time('fin').notNull(),
    
    claseId: uuid('clase_id').notNull().references(()=> clases.id, {onDelete: 'cascade'})
})