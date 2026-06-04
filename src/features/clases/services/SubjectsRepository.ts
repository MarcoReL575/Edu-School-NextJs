import { db } from "@/src/db"
import { ClasesInsertType, SubjetcsSelectType } from "../types/types"
import { subjects } from "@/src/db/schema"
import { eq } from "drizzle-orm";

export interface ISubjectsRepository {
    selectAll(): Promise<SubjetcsSelectType[]>;
    selectById(subjectId: string): Promise<SubjetcsSelectType>
}

class SubjectsRepository implements ISubjectsRepository {
    async selectAll(): Promise<SubjetcsSelectType[]> {
        const result = await db
            .select()
            .from(subjects)
        return result
    }

    async selectById(subjectId: string): Promise<SubjetcsSelectType> {
        const [clases] = await db
            .select()
            .from(subjects)
            .where(eq(subjects.id, subjectId))
        return clases
    }
}

export const subjectsRepository = new SubjectsRepository();