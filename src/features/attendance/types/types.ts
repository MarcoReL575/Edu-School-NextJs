import { attendance } from "@/src/db/schema";

export type AttendanceSelect = typeof attendance.$inferSelect
export type AttendanceInsert = typeof attendance.$inferInsert

export type StatusAttendance = "asistencia" | "falta" | "retardo" | "justificado";