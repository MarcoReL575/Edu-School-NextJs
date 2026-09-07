import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/src/db";
import { parents, parentStudents, students } from "@/src/db/schema";
import { StudentsSelectType } from "../../students/types/types";
import { ParentsSelectType } from "../types/types";

export interface IParentsRepository {
    selectChildrenByUserId(userId: string): Promise<StudentsSelectType[]>;
    selectParentsUserIdByStudentIds(studentIds: string[]): Promise<string[]>;
    selectParentByUserId(userId: string): Promise<ParentsSelectType | undefined>;
    linkStudent(parentId: string, studentId: string): Promise<void>;
    unlinkStudent(parentId: string, studentId: string): Promise<void>;
    isStudentLinked(parentId: string, studentId: string): Promise<boolean>;
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
    async selectParentByUserId(userId: string): Promise<ParentsSelectType | undefined> {
        const [parent] = await db
            .select()
            .from(parents)
            .where(eq(parents.user_id, userId))
        return parent;
    }

    async linkStudent(parentId: string, studentId: string): Promise<void> {
        await db
            .insert(parentStudents)
            .values({ parentId, studentId })
    }

    async unlinkStudent(parentId: string, studentId: string): Promise<void> {
        await db
            .delete(parentStudents)
            .where(and(eq(parentStudents.parentId, parentId), eq(parentStudents.studentId, studentId)))
    }

    async isStudentLinked(parentId: string, studentId: string): Promise<boolean> {
        const [link] = await db
            .select()
            .from(parentStudents)
            .where(and(eq(parentStudents.parentId, parentId), eq(parentStudents.studentId, studentId)))
        return !!link;
    }
}

export const parentsRepository = new ParentsRepository();
