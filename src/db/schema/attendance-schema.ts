// src/db/schema/attendance-schema.ts
import { pgTable, text, timestamp, uuid, bigint, date } from "drizzle-orm/pg-core";
import { students } from "./studentsSchema";
import { clases } from "./clasesSchemas";

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date").notNull(), 
  status: text("status").$type<"asistencia" | "falta" | "retardo" | "justificado" >().notNull(),  
  remarks: text("remarks"), // Nota opcional (ej: "Trajo justificatorio médico")

  
  studentId: uuid("student_id").references(() => students.id, { onDelete: "cascade" }).notNull(),
  claseId: uuid("clase_id").references(() => clases.id, { onDelete: "cascade" }).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});