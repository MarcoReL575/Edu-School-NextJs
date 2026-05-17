// src/db/schema/tasks-schema.ts
import { pgTable, text, timestamp, uuid, bigint, pgEnum } from "drizzle-orm/pg-core";
import { clases } from "./clasesSchemas";

export const taskStatusEnum = pgEnum("task_status", ["pendiente", "en progreso", "terminada"]);

export const tasks = pgTable("tasks", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    fechaEntrega: timestamp("fecha_entrega").notNull(),
    status: taskStatusEnum("status").default("pendiente").notNull(),

    claseId: uuid("clase_id").references(() => clases.id).notNull(),
});