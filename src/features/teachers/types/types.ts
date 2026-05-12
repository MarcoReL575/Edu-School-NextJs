import { teachers } from "@/src/db/schema";

export type TeachersSelectType = typeof teachers.$inferSelect;
export type TeachersInsertType = typeof teachers.$inferInsert;

export type TeachersClases = {
    id: string;
    subjectName: string;
    group: string;
    grade: string;
    level: string;
}