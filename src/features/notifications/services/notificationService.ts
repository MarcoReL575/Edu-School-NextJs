import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
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
}

export const notificationService = new NotificationService(notificationRepository, usersRepository);