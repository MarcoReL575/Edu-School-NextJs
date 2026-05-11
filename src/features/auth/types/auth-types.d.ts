import z from "zod";
import { SignInSchema, SignUpSchema } from "../schemas/auth-schemas";
import { students, teachers } from "@/src/db/schema";

export type Role = 'maestro' | 'estudiante' | 'admin' | 'tutor';

export type SignUpProps  = z.infer <typeof SignUpSchema>;

export type InfoStudent = {
    enrolledStudent: boolean,
    studentInfo: EnrolledStudentsSelect | undefined
}
export type EnrolledStudentsInsert = typeof students.$inferInsert;
export type EnrolledStudentsSelect = typeof students.$inferSelect;

export type EnrolledTeachersInsert = typeof teachers.$inferInsert;
export type EnrolledTeachersSelect = typeof teachers.$inferSelect;

export type SignInProps = z.infer<typeof SignInSchema> 


export type TeacherInfo = {
    enrolledTeacher: boolean,
    teacherInfo: EnrolledTeachersSelect | undefined
}
