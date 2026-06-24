import { pusher } from "@/src/lib/pusher";
import { NotificationSelect } from "../types/types";

export interface INotificationPublisher {
    notify(notification: NotificationSelect): Promise<void>;
    notifyMany(notifications: NotificationSelect[]): Promise<void>;
}

class NotificationPusher implements INotificationPublisher {
    async notify(notification: NotificationSelect): Promise<void> {
        await pusher.trigger(
            `notifications-channel-${notification.userId}`,
            'new-notification',
            notification
        )
    }

    async notifyMany(notifications: NotificationSelect[]): Promise<void> {
        if (notifications.length === 0) return;

        const events = notifications.map((notification) => ({
            channel: `notifications-channel-${notification.userId}`,
            name: 'new-notification',
            data: notification
        }));

        await pusher.triggerBatch(events);
    }
}

export const notificationPusher = new NotificationPusher();