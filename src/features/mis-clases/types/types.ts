import { classGrades } from "@/src/db/schema";

export type ClassGradesSelect = typeof classGrades.$inferSelect;
export type ClassGradesInsert = typeof classGrades.$inferInsert;