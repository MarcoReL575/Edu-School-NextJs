import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
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
}

export const notificationService = new NotificationService(notificationRepository, usersRepository);