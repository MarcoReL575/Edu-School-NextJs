import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { students, teachers, user } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { InfoStudent, Role, SignInProps, SignUpProps, TeacherInfo } from "../types/auth-types"
import { User } from "better-auth";

export interface IAuthRepository {
    roleAssign(role: Role, email:string): Promise<void>;
    signin(data: SignInProps): Promise<void>;
    selectStudent(input: SignUpProps): Promise<InfoStudent>;
    insertStudentId(id: string, matricula:string): Promise<void>;
    insertTeacherId(id: string, matricula:string): Promise<void>;
    userExists(email: string): Promise<User | undefined>;
    
    selectTeacher(input: SignUpProps): Promise<TeacherInfo>;
}

class AuthRepository implements IAuthRepository {

    async roleAssign(role: Role, email:string): Promise<void> {
        await db
            .update(user)
            .set({
                role: role
            })
            .where(eq(user.email, email))
    }

    async signin(data: SignInProps): Promise<void> {
        await auth.api.signInEmail({
            body: {
                email: data.email,
                password: data.password
            },
            headers: await headers()
        })
    }

    async selectStudent(input: SignUpProps): Promise<InfoStudent> {
        const studentInfo = await db
            .query
            .students
            .findFirst({
                where: (students, { eq, and }) => (
                    and(
                        eq(students.matricula, input.roleId),
                        eq(students.name, input.name ),
                        eq(students.lastName, input.lastname)
                    )
                )
            })
        return {
            enrolledStudent: !!studentInfo?.inscrito,
            studentInfo: studentInfo
        }
    }


    async userExists(email: string): Promise<User | undefined> {
        const user = await db
            .query
            .user
            .findFirst({
                where: (user, { eq })=> (
                    eq(user.email, email)
                ),
            })
        return user;
    }

    async insertStudentId(id: string, matricula:string): Promise<void> {
        await db
        .update(students)
        .set({
            user_id: id
        })
        .where(eq(students.matricula, matricula))
    }

    async insertTeacherId(id: string, matricula: string): Promise<void> {
        await db
            .update(teachers)
            .set({
                userId: id
            })
            .where(eq(teachers.code_teacher, matricula))
    }

    async selectTeacher(input: SignUpProps): Promise<TeacherInfo> {
        const teacherInfo = await db
            .query
            .teachers
            .findFirst({
                where: (teachers, { eq, and }) => (
                    and(
                        eq(teachers.code_teacher, input.roleId),
                        eq(teachers.name, input.name),
                        eq(teachers.lastName, input.lastname)
                    )
                )
            })
        return {
            enrolledTeacher: !!teacherInfo,
            teacherInfo: teacherInfo
        }
    }
    
}

export const authRepository = new AuthRepository()