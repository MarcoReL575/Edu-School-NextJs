'use server'

import { requireAuth } from "@/src/lib/auth-server"
import { examService } from "../../examenes/services/examService";
import { taskService } from "../../tasks/services/taskService";
import { attendanceService } from "../../attendance/services/attendanceService";
import { ExamWithResult } from "../../examenes/types/types";
import { clasesServices } from "../../clases/services/ClasesServices";

export async function getExamsAndResultActions(studentId: string, subjectName: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', exams: [] as ExamWithResult[] }

    return await examService.getExamAndResult(studentId, subjectName);
}

export async function getTasksAction(studentId: string, groupId: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', tasks: [] }

    return await taskService.getAllTasks(groupId, studentId);
}

export async function getAttendanceAction(studentId: string, subjectName: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', attendances: []}

    return await attendanceService.getAttendanceStudentInClass(studentId, subjectName);
}

export async function getHorariosAction(claseId: string) {
    const { session } = await requireAuth();
    if(!session.user) return { success: false, message: 'Error de usuario', horarios: []};

    return await clasesServices.getHorarios(claseId);
}
