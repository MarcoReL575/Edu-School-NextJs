import { db } from "@/src/db";
import { AttendanceInsert, AttendanceSelect, AttendanceStudentTable } from "../types/types";
import { attendance, clases, subjects } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface IAttendanceRepository {
    insertAttendance(tax: any, attendanceStudents: AttendanceInsert[]): Promise<void>;
    selectAttendanceStudent(studentId: string): Promise<AttendanceStudentTable[]>
}

class AttendanceRepository implements IAttendanceRepository {
    async insertAttendance(tx: any, attendanceStudents: AttendanceInsert[]): Promise<void> {
        await tx
            .insert(attendance)
            .values(attendanceStudents)
    }

    async selectAttendanceStudent(studentId: string): Promise<AttendanceStudentTable[]> {
        const attendances = await db
            .select({
                id: attendance.id,
                date: attendance.date,
                hour: attendance.createdAt,
                status: attendance.status,
                subjectName: subjects.name
            })
            .from(attendance)
            .innerJoin(clases, eq( clases.id, attendance.claseId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .where(eq(attendance.studentId, studentId))
        return attendances;
    }
}

export const attendanceRepository = new AttendanceRepository();