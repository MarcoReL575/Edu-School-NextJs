import { db } from "@/src/db";
import { students, teachers, user } from "@/src/db/schema";
import { StudentsInfo, TeachersSelectType } from "../types/types";
import { and, eq } from "drizzle-orm";

export interface IUsersRepository{
    selectAllTeachers(): Promise<TeachersSelectType[]>;
    selectInfoStudents(userId: string): Promise<StudentsInfo>;
}

class UsersRepository implements IUsersRepository {
    async selectAllTeachers(): Promise<TeachersSelectType[]> {
        const result =  await db
            .select()
            .from(teachers)
        return result;
    }

    async selectInfoStudents(userId: string): Promise<StudentsInfo> {
        console.log(userId)
        const [result] = await db
            .select({
                id: user.id,
                email: user.email,
                role: user.role,
                image: user.image,
                name: students.name,
                last_name: students.lastName,
                nivel_estudios: students.nivelEstudios,
                group_id: students.groupId,
                user_id: students.user_id
            })
            .from(user)
            .innerJoin( students, eq(students.user_id, userId))
            .where(eq(user.id, userId))
        console.log(result)
        return result
    }
}

export const usersRepository = new UsersRepository();