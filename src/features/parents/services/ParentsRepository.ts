import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { parents, parentStudents, students } from "@/src/db/schema";
import { StudentsSelectType } from "../../students/types/types";

export interface IParentsRepository {
    selectChildrenByUserId(userId: string): Promise<StudentsSelectType[]>;
}

class ParentsRepository implements IParentsRepository {
    async selectChildrenByUserId(userId: string): Promise<StudentsSelectType[]> {
        const children = await db
            .select({
                id: students.id,
                name: students.name,
                lastName: students.lastName,
                matricula: students.matricula,
                inscrito: students.inscrito,
                nivelEstudios: students.nivelEstudios,
                groupId: students.groupId,
                user_id: students.user_id,
            })
            .from(parentStudents)
            .innerJoin(parents, eq(parentStudents.parentId, parents.id))
            .innerJoin(students, eq(parentStudents.studentId, students.id))
            .where(eq(parents.user_id, userId))

        return children;
    }
}

export const parentsRepository = new ParentsRepository();
