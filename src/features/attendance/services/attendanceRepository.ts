import { db } from "@/src/db";
import { AttendanceInsert, AttendanceSelect } from "../types/types";
import { attendance } from "@/src/db/schema";

export interface IAttendanceRepository {
    insertAttendance(tax: any, attendanceStudents: AttendanceInsert[]): Promise<void>
}

class AttendanceRepository implements IAttendanceRepository {
    async insertAttendance(tx: any, attendanceStudents: AttendanceInsert[]): Promise<void> {
        await tx
            .insert(attendance)
            .values(attendanceStudents)
    }
}

export const attendanceRepository = new AttendanceRepository();