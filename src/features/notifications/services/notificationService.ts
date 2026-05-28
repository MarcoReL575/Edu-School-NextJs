import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
import { TaskDetails } from "../../tasks/types/types";
import { NotificationSelect } from "../types/types";
import { INotificationRepository, notificationRepository } from "./notificationRepository";

class NotificationService{
    constructor(
        private notificationRepository : INotificationRepository,
        private usersRepository: IUsersRepository
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

    async readNotification(userId: string) {
        try {
            await this.notificationRepository.setReadNotification(userId);
            return { success: true, message: '' }
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
}

export const notificationService = new NotificationService(notificationRepository, usersRepository);