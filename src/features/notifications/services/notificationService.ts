import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
import { ITaskRepository, taskRepository } from "../../tasks/services/taskRepository";
import { SubmitTasksStudents, TaskDetails, TaskSubmissionSelect } from "../../tasks/types/types";
import { NotificationSelect } from "../types/types";
import { INotificationRepository, notificationRepository } from "./notificationRepository";

class NotificationService{
    constructor(
        private notificationRepository : INotificationRepository,
        private taskRepository: ITaskRepository
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
            await this.notificationRepository.insertNotificationSubmittedTask({
                userId: taskInfo.teacherUserId?? '',
                title: `Tarea Entregada: ${taskInfo.taskTitle}`,
                message: `Se ha recibido la tarea: ${taskInfo.subjectName} - ${taskInfo.taskDescription}` ,
                type: 'task_created' as const ,
                isRead: false,
                redirectUrl: `/dashboard/tareas/${taskInfo.taskId}`,
            });
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
            await this.notificationRepository.insertNotificationGradedTask({
                userId: userId,
                title: `Tarea Calificada: ${taskSubmission.calificacion}`,
                message: `Tu tarea ya fue calificada. Comentarios: ${taskSubmission.feedback?? 'sin comnetarios'}` ,
                type: 'task_created' as const ,
                isRead: false,
                redirectUrl: `/dashboard/tareas/`,
            });
            return { success: true, message: '' }
        } catch (error) {
            return { success: false, message: 'Error al crear la notificación' }
        } 
    }
}

export const notificationService = new NotificationService(notificationRepository, taskRepository);