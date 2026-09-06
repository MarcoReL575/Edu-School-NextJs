import { eq, inArray } from "drizzle-orm";
import { db } from "@/src/db";
import { parents, parentStudents, students } from "@/src/db/schema";
import { StudentsSelectType } from "../../students/types/types";

export interface IParentsRepository {
    selectChildrenByUserId(userId: string): Promise<StudentsSelectType[]>;
    selectParentsUserIdByStudentIds(studentIds: string[]): Promise<string[]>;
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

    async selectParentsUserIdByStudentIds(studentIds: string[]): Promise<string[]> {
        if (studentIds.length === 0) return [];

        const parentsList = await db
            .selectDistinct({ user_id: parents.user_id })
            .from(parentStudents)
            .innerJoin(parents, eq(parentStudents.parentId, parents.id))
            .where(inArray(parentStudents.studentId, studentIds));

        return parentsList
            .map((parent) => parent.user_id)
            .filter((userId): userId is string => userId !== null);
    }
}

export const parentsRepository = new ParentsRepository();
