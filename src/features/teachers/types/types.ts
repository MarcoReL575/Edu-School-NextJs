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
    averageScore: number | null;
    totalStudents: number | null;
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
    finalScore: string | null
}

export type InfoHorariosTechaer = {
    claseId: string;
    slug: string | null;
    subjectName: string;
    grade: string;
    groupName: string;
    level: string;
    dia: "lunes" | "martes" | "miercoles" | "jueves" | "viernes";
    inicio: string;
    fin: string;
}

export type DaysOfWeek = "lunes" | "martes" | "miercoles" | "jueves" | "viernes"