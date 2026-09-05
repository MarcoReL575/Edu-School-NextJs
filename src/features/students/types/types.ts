import { students } from "@/src/db/schema";

export type StudentsSelectType = typeof students.$inferSelect;
export type StudentsInsertType = typeof students.$inferInsert;

export type StudentsInfo = {
    id: string;
    email: string;
    role: string;
    image: string | null;
    name: string;
    last_name: string;
    nivel_estudios: string;
    group_id: string | null;
    user_id: string | null;
}

export type StudentsTable = {
    id: string;
    name: string;
    last_name: string;
    inscrito: boolean;
    matricula: string;
    grade: string;
    group: string;
    level: string;
    user_id: string | null;
    group_id: string;
}

export type StudentsAndScoresInfo = {
    id: string;
    name: string;
    last_name: string;
    inscrito: boolean;
    matricula: string;
    grade: string;
    group: string;
    level: string;
    scoreFinal: string | null;
}
