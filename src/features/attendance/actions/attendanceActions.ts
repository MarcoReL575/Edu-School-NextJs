'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { attendanceService } from "../services/attendanceService"
import { AttendanceStudentTable } from "../types/types";
import { parentsService } from "../../parents/services/ParentsService";

export async function takeAttendanceAction(attendance: Record<string, boolean>, claseId: string) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') 
    return { success: false, message: 'El usuario no cuenta con los permisos necesarios' } 

    return await attendanceService.takeAttendance(attendance, claseId);
}

export async function getAttendancesByStudentAction(studentId: string) {
    const { session } = await requireAuth();

    if (session.user.role === 'tutor') {
        const children = await parentsService.getChildrenByUserId(session.user.id);
        const isOwnChild = children.some((child) => child.id === studentId);
        if (!isOwnChild) return { success: false, message: 'El usuario no cuenta con los permisos necesarios', attendances: {} as AttendanceStudentTable[] }
        return attendanceService.getAttendancesByStudentId(studentId);
    }

    if(session.user.role !== 'estudiante') return { success: false, message: 'El usuario no cuenta con los permisos necesarios', attendances: {} as AttendanceStudentTable[] }

    return attendanceService.getAttendancesByStudentId(studentId);
}