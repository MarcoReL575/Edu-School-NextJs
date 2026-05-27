// src/db/schema/notifications-schema.ts
import { pgTable, text, timestamp, uuid, boolean, bigint } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";


export const notifications = pgTable("notifications", {
    id: uuid("id").primaryKey().defaultRandom(),

    // Clave foránea que apunta al usuario que recibirá la alerta (Alumno, Maestro o Padre)
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),

    // Título de la notificación (Ej: "Nueva Tarea Asignada")
    title: text("title").notNull(),

    // Contenido detallado (Ej: "El profesor Juan Doe publicó la tarea 'Ecuaciones' en Matemáticas")
    message: text("message").notNull(),

    // Tipo de notificación para poder usar iconos o redirigir dinámicamente en el Fronted
    // Ejemplos: 'task_created', 'task_graded', 'attendance_alert', 'announcement'
    type: text("type").$type<"task_created" | "task_graded" | "attendance_alert" | "announcement">().notNull(),

    // Control de lectura
    isRead: boolean("is_read").default(false).notNull(),

    // REDIRECCIÓN INTELIGENTE (Crucial para UX): 
    // URL interna a la que irá el usuario al hacer clic en la notificación
    // Ej: "/dashboard/tareas/revisar/1" o "/dashboard/trabajos"
    redirectUrl: text("redirect_url"),

    // Timestamps de control
    createdAt: timestamp("created_at").defaultNow().notNull(),
});