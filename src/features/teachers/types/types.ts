import { teachers } from "@/src/db/schema";

export type TeachersSelectType = typeof teachers.$inferSelect;
export type TeachersInsertType = typeof teachers.$inferInsert;

export type TeachersClases = {
    id: string;
    slug: string | null;
    subjectName: string;
    group: string;
    grade: string;
    level: string;
    groupId: string;
}


export type TeachersClasesAllInfo = {
    id: string;
    slug: string | null;
    subjectName: string;
    groupId: string;
    grade: string;
    group: string;
    level: string;
    teacherName: string; 
    teacherLastName: string;
    finalScore: string
}