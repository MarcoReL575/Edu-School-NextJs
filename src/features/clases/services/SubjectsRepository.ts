import { db } from "@/src/db"
import { SubjetcsSelectType } from "../types/types"
import { subjects } from "@/src/db/schema"

export interface ISubjectsRepository {
    selectAll(): Promise<SubjetcsSelectType[]>
}

class SubjectsRepository implements ISubjectsRepository {
    async selectAll(): Promise<SubjetcsSelectType[]> {
        const result = await db
            .select()
            .from(subjects)
        return result
    }
}

export const subjectsRepository = new SubjectsRepository();