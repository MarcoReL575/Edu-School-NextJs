import { clases, horarios, subjects, teachers, user } from "@/src/db/schema";
import z from "zod";
import { CreateClasesSchema } from "../schema/clasesSchemas";
import { AttendanceSelect } from "../../attendance/types/types";
import { StudentsSelectType } from "../../students/types/types";
import { GroupSelectType } from "../../group/types/types";


export type HorariosSelectType = typeof horarios.$inferSelect;
export type HorariosInsertType = typeof horarios.$inferInsert;

export type SubjetcsSelectType = typeof subjects.$inferSelect;
export type SubjetcsInsertType = typeof subjects.$inferInsert;

export type ClasesSelectType = typeof clases.$inferSelect;
export type ClasesInsertType = typeof clases.$inferInsert;
export type ClasesInputType = z.infer <typeof CreateClasesSchema>;

export type UserSelectType = typeof user.$inferSelect;
export type UserInsertType = typeof user.$inferInsert;

export type ClasesInfoComplete =  {
    id: string;
    subject: string;
    teacher: string;
    group: string;
    grado: string;
    level: string;
    slug: string | null;
}

export type TypeAction = 'clase' | 'grupo' | 'students'

export type OptionsDays = {
    value: string;
    label: string
}


export type HorariosClases = {
    dayOfWeek: "lunes" | "martes" | "miercoles" | "jueves" | "viernes" ;
    startTime: string;
    endTime: string;
    claseId: string;
}


//////types for tables
export type GroupColumns = {
    group: string; 
    grade: string; 
    level: string; 
    id?: string | undefined 
}

export type GroupCompleteInfo = {
    claseId: string;
    subjectName: string;
    subjectsLevel: string;
    teacherFirst: string;
    teacherLast: string;
    dayOfWeek: "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | null;
    startTime: string | null;
    endTime: string | null;
}

export type ClassesByGroup = {
    slug: string | null;
    id: string;
    subjectName: string | null;
    teachersName: string | null;
    teachersLastname: string | null;
    attendances: AttendanceSelect[]
    finalGrade: string | null;
    finalGradeUpdatedAt: Date;
}

export type AttendanceStatus = "asistencia" | "falta" | "retardo" | "justificado";
export type StudentAttendance = StudentsSelectType & ({
    attendance: AttendanceStatus
})


export type ClasesInfoByAttendance = {
    subjectName: string;
    grade: string;
    group: string;
    level: string;
    students: StudentAttendance[];
}