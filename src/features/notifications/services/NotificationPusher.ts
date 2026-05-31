import { pusher } from "@/src/lib/pusher";
import { NotificationSelect } from "../types/types";

export interface INotificationPublisher {
    notify(notification: NotificationSelect): Promise<void>
}

class NotificationPusher implements INotificationPublisher {
    async notify(notification: NotificationSelect): Promise<void> {
        await pusher.trigger(
            `notifications-channel-${notification.userId}`,
            'new-notification',
            notification
        )
    }
}

export const notificationPusher = new NotificationPusher();