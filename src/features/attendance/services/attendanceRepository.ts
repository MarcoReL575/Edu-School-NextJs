import { db } from "@/src/db";
import { AttendanceInsert, AttendanceResult, AttendanceSelect, AttendanceStudentTable } from "../types/types";
import { attendance, clases, subjects } from "@/src/db/schema";
import { and, count, desc, eq, sql } from "drizzle-orm";

export interface IAttendanceRepository {
    insertAttendance(tax: any, attendanceStudents: AttendanceInsert[]): Promise<void>;
    selectAttendanceStudent(studentId: string): Promise<AttendanceStudentTable[]>;
    selectAttendanceStudentByClass(studentId: string, claseId: string): Promise<AttendanceSelect[]>;
    selectTotalAttendance(studentId: string): Promise<AttendanceResult>;
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

    async selectAttendanceStudentByClass(studentId: string, claseId: string): Promise<AttendanceSelect[]> {
        const attendace= await db
            .select()
            .from(attendance)
            .where(and(
                eq(attendance.studentId, studentId),
                eq(attendance.claseId, claseId)
            ))
            .orderBy(desc(attendance.date))
        return attendace;
    }

    async selectTotalAttendance(studentId: string): Promise<AttendanceResult> {
        const [attendanceResult] = await db
        .select({
            totalClasses: count(attendance.id),
            attendedClasses: sql<number>`count(CASE WHEN ${eq(attendance.status, 'asistencia')} THEN 1 END)`
        })
        .from(attendance)
        .where(eq(attendance.studentId, studentId));

    return attendanceResult ?? { totalClasses: 0, attendedClasses: 0 };
    }
}

export const attendanceRepository = new AttendanceRepository();