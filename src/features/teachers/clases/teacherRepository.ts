import { db } from "@/src/db";
import { TeachersSelectType } from "../types/types";
import { teachers } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface ITeacherRepository {
    selectById(userId: string): Promise<TeachersSelectType>;
}

class TeacherRepository implements ITeacherRepository {
    async selectById(userId: string): Promise<TeachersSelectType> {
        const [teacher] = await db
            .select()
            .from(teachers)
            .where(eq(teachers.userId, userId))
        return teacher;
    }
}

export const teacherRepository = new TeacherRepository();