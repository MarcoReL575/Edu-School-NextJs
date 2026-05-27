import { INotificationRepository, notificationRepository } from "./notificationRepository";

class NotificationService{
    constructor(
        private notificationRepository : INotificationRepository
    ){}
}

export const notificationService = new NotificationService(notificationRepository)