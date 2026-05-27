import { db } from "@/src/db";
import { students, teachers, user } from "@/src/db/schema";
import { StudentsInfo, UserSelectType } from "../types/types";
import { eq } from "drizzle-orm";
import { TeachersSelectType } from "../../teachers/types/types";

export interface IUsersRepository{
    selectAllTeachers(): Promise<TeachersSelectType[]>;
    selectInfoStudents(userId: string): Promise<StudentsInfo>;
    selectUser(userId: string): Promise<UserSelectType>
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

    async selectUser(userId: string): Promise<UserSelectType> {
        const [userExist] = await db
            .select()
            .from(user)
            .where(eq(user.id, userId))
        return userExist;
    }
}

export const usersRepository = new UsersRepository();