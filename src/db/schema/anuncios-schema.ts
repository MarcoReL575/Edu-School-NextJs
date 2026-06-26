import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const announcementTargetEnum = pgEnum("announcement_target", [
    "all",       // Todos (Alumnos y Maestros)
    "students",  // Solo Alumnos
    "teachers",  // Solo Maestros
]);

// 1. Tabla de Anuncios
export const announcements = pgTable("announcements", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),

    targetType: announcementTargetEnum("target_type").default("all").notNull(),
    
    // El autor del anuncio (Debe ser un usuario con rol de administrador)
    authorId: text("author_id").notNull().references(() => user.id, { onDelete: "cascade" }),    
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
