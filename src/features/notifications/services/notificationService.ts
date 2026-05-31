import { taskRepository } from "../../tasks/services/taskRepository";
import { TaskDetails, TaskSubmissionSelect } from "../../tasks/types/types";
import { NotificationInsert, NotificationSelect } from "../types/types";
import { INotificationPublisher, notificationPusher } from "./NotificationPusher";
import { INotificationRepository, notificationRepository } from "./notificationRepository";

class NotificationService{
    constructor(
        private notificationRepository : INotificationRepository,
        private notificationPusher: INotificationPublisher
    ){}

    async getCountNotificationsUser(userId: string) {
        try {
            return await this.notificationRepository.selectCountByUser(userId);
        } catch (error) {
            return 0
        }
    }

    async getUserNotifications(userId: string) {
        try {
            return await this.notificationRepository.selectByUser(userId);
        } catch (error) {
           return {} as NotificationSelect[]
        }
    }

    async readAllNotification(userId: string) {
        try {
            await this.notificationRepository.setReadAllNotification(userId);
            return { success: true, message: 'Se han limpiado tus notificaciones' }
        } catch (error) {
            return { success: false, message: 'Error al encontrar la notificación' }
        }
    }

    async notificationSubmittedTask(taskInfo: TaskDetails) {
        try {
            const notification = await this.notificationRepository.insertNotificationSubmittedTask({
                userId: taskInfo.teacherUserId?? '',
                title: `Tarea Entregada: ${taskInfo.taskTitle}`,
                message: `Se ha recibido la tarea: ${taskInfo.subjectName} - ${taskInfo.taskDescription}` ,
                type: 'task_created' as const ,
                isRead: false,
                redirectUrl: `/dashboard/tareas/${taskInfo.taskId}`,
            });
            await this.notificationPusher.notify(notification);
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Error al crear la notificación' }
        }
    }

    async readSingleNotification(notificationId: string) {
        try {
            await this.notificationRepository.setReadSingleNotification(notificationId);
            return { success: true, message: '' }
        } catch (error) {
            return { success: false, message: 'Error al crear la notificación' }
        }
    }

    async notificationGradedTask(taskSubmission: TaskSubmissionSelect, userId: string) {
        try {
            const notification = await this.notificationRepository.insertNotificationGradedTask({
                userId: userId,
                title: `Tarea Calificada: ${taskSubmission.calificacion}`,
                message: `Tu tarea ya fue calificada. Comentarios: ${taskSubmission.feedback?? 'sin comnetarios'}` ,
                type: 'task_created' as const ,
                isRead: false,
                redirectUrl: `/dashboard/tareas/`,
            });

            await this.notificationPusher.notify(notification);
            return { success: true, message: '' }
        } catch (error) {
            return { success: false, message: 'Error al crear la notificación' }
        } 
    }

    async createAndNotify(data: NotificationInsert) {

    }
}

export const notificationService = new NotificationService(notificationRepository, notificationPusher);