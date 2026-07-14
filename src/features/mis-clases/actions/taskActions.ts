'use server'

import { requireAuth } from "@/src/lib/auth-server"
import { examService } from "../../examenes/services/examService";
import { taskService } from "../../tasks/services/taskService";
import { attendanceService } from "../../attendance/services/attendanceService";
import { ExamWithResult } from "../../examenes/types/types";

export async function getExamsAndResultActions(studentId: string, subjectName: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', exams: [] as ExamWithResult[] }

    return await examService.getExamAndResult(studentId, subjectName);
}

export async function getTasksAction(studentId: string, groupId: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', tasks: [] }

    const tasks = await taskService.getAllTasks(groupId, studentId);
    return { success: true, message: '', tasks }
}

export async function getAttendanceAction(studentId: string, subjectName: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', tasks: [] }

    const tasks = await attendanceService.getAttendanceStudentInClass(studentId, subjectName);
    return { success: true, message: '', tasks }
}

