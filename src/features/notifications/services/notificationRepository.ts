import { db } from "@/src/db"
import { NotificationInsert, NotificationSelect } from "../types/types"
import { notifications, students, user } from "@/src/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"

export interface INotificationRepository {
    insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]>;
    selectByUser(userId: string): Promise<NotificationSelect[]>;
    selectCountByUser(userId: string): Promise<number>;
    setReadAllNotification(userId: string): Promise<void>;
    insertNotificationSubmittedTask(notification: NotificationInsert): Promise<void>;
    setReadSingleNotification(notificationId: string): Promise<void>;
    insertNotificationGradedTask(notification: NotificationInsert): Promise<void>;
}

class NotificationRepository implements INotificationRepository {
    async insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]> {
        const result = await db 
            .insert(notifications)
            .values(notification)
            .returning()
        return result;
    }

    async selectByUser(userId: string): Promise<NotificationSelect[]> {
        const notificationsUser = await db
            .select()
            .from(notifications)
            .where(eq(notifications.userId, userId))
            .orderBy(desc(notifications.createdAt))
        return notificationsUser;
    }

    async selectCountByUser(userId: string): Promise<number> {
        const countNotifications = await db
            .$count(notifications, and(
                eq(notifications.userId, userId),
                eq(notifications.isRead, false)
            ));
        return countNotifications;
    }

    async setReadAllNotification(userId: string): Promise<void> {
        await db
            .update(notifications)
            .set({
                isRead: true
            })
            .where(eq(notifications.userId, userId));
    }

    async insertNotificationSubmittedTask(notification: NotificationInsert): Promise<void> {
        await db
            .insert(notifications)
            .values(notification)
    }

    async setReadSingleNotification(notificationId: string): Promise<void> {
        await db
            .update(notifications)
            .set({
                isRead: true
            })
            .where(eq(notifications.id, notificationId))
    }

    async insertNotificationGradedTask(notification: NotificationInsert): Promise<void> {
        await db
            .insert(notifications)
            .values(notification)
    }
}

export const notificationRepository = new NotificationRepository()
