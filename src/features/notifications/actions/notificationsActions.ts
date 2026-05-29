'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { notificationService } from "../services/notificationService";
import { SubmitTasksStudents, TaskDetails, TaskSubmissionSelect } from "../../tasks/types/types";
import { studentsService } from "../../clases/services/StudentsService";

export async function clearAllNotificationAction() {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuario no cuenta con los permisos necesario' };
    
    return await notificationService.readAllNotification(session.user.id);
}

export async function notificationSubmittedTaskAction(taskInfo: TaskDetails) {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuario no cuenta con los permisos necesarios' };

    return await notificationService.notificationSubmittedTask(taskInfo)
}

export async function clearSingleNotificationAction(notificationId: string) {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuario no cuenta con los permisos necesarios' };

    return await notificationService.readSingleNotification(notificationId);
}

export async function notificationGradedTask(taskSubmission: TaskSubmissionSelect) {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuario no cuenta con los permisos necesarios' };

    const studentInfo = await studentsService.studentsExists(taskSubmission.studentId)

    return await notificationService.notificationGradedTask(taskSubmission, studentInfo.user_id?? '');
}



