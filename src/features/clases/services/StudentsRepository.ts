import { db } from "@/src/db";
import { StudentsInsertType, StudentsSelectType, StudentsTable, SubmitTasksStudents } from "../types/types";
import { group, students, subjects } from "@/src/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { CreateStudent } from "../schema/clasesSchemas";
import { taskSubmission } from "@/src/db/schema/taskSubmissions-schema";

export interface IStudentsRepository{
    createStudent(student: CreateStudent): Promise<void>;
    selectStudentById(studentId: string): Promise<StudentsSelectType>;
    selectStudentByUserId(userId: string): Promise<StudentsSelectType>;
    setStudent(student: StudentsInsertType): Promise<void>;
    deleteStudentById(studentId: string): Promise<void>;
    selectAllStudents(): Promise<StudentsTable[]>;
    selectInfoStudent(userId: string): Promise<StudentsSelectType>;
};

class StudentsRepository implements IStudentsRepository {
    async createStudent(student: StudentsInsertType): Promise<void> {
        await db
            .insert(students)
            .values(student)
    };
        
    async selectStudentById(studentId: string): Promise<StudentsSelectType> {
        const [student] = await db
            .select()
            .from(students)
            .where(eq(students.id, studentId))
        return  student;
    };

    async selectStudentByUserId(userId: string): Promise<StudentsSelectType> {
        const [student] = await db
            .select()
            .from(students)
            .where(eq(students.user_id, userId))
        return  student;
    }

    async setStudent(student: StudentsInsertType): Promise<void> {
        await db
            .update(students)
            .set({
                name: student.name,
                lastName: student.lastName,
                nivelEstudios: student.nivelEstudios,
                groupId: student.groupId
            })
            .where(eq(students.id, student.id!))
    };

    async deleteStudentById(studentId: string): Promise<void> {
        await db
            .update(students)
            .set({inscrito: false})
            .where(eq(students.id, studentId))
    }

    async selectAllStudents(): Promise<StudentsTable[]> {
        const result = await db
            .select({
                id: students.id,
                name: students.name,
                last_name: students.lastName,
                inscrito: students.inscrito,
                matricula: students.matricula,
                grade: group.grade,
                group: group.group,
                level: group.level,
                user_id: students.user_id,
                group_id: students.groupId
            })
            .from(students)
            .where(eq(students.inscrito, true))
            .orderBy(desc(group.level), asc(group.grade))
            .innerJoin(group, eq(students.groupId, group.id));
        return result;
    };

    async selectInfoStudent(userId: string): Promise<StudentsSelectType> {
        const [student] = await db
            .select()
            .from(students)
            .where(eq(students.user_id, userId))

        return student;
    };
};

export const studentsRepository = new StudentsRepository();

