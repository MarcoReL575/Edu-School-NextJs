// src/db/schema/tasks-schema.ts
import { pgTable, text, timestamp, uuid, bigint } from "drizzle-orm/pg-core";
import { clases } from "./clasesSchemas";

export const tasks = pgTable("tasks", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    fechaEntrega: timestamp("fecha_entrega").notNull(),
    
    claseId: uuid("clase_id").references(() => clases.id).notNull(),
});