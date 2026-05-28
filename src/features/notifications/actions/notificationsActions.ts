'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { notificationService } from "../services/notificationService";
import { TaskDetails } from "../../tasks/types/types";

export async function clearNotificationAction() {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuariio no cuenta con permisos para ver notificaciones' };
    
    return await notificationService.readNotification(session.user.id);
}

export async function notificationSubmittedTaskAction(taskInfo: TaskDetails) {
    const { session } = await requireAuth();
    if(!session.user.id) return { success: false, message: 'El usuario no cuenta con los permisos necesarios' };

    return await notificationService.notificationSubmittedTask(taskInfo)
}