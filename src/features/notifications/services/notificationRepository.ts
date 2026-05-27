import { db } from "@/src/db"
import { NotificationInsert, NotificationSelect } from "../types/types"
import { notifications, students, user } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export interface INotificationRepository {
    insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]>;
    selectByUserId(userId: string): Promise<NotificationSelect[]>;
    selectCountByUser(userId: string): Promise<number>;
}

class NotificationRepository implements INotificationRepository {
    async insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]> {
        const result = await db 
            .insert(notifications)
            .values(notification)
            .returning()
        return result;
    }

    async selectByUserId(userId: string): Promise<NotificationSelect[]> {
        const notificationsUser = await db
            .select()
            .from(notifications)
            .where(eq(notifications.userId, userId))
        return notificationsUser;
    }

    async selectCountByUser(userId: string): Promise<number> {
        const countNotifications = await db
            .$count(notifications, eq(notifications.userId, userId));
        return countNotifications;
    }
}

export const notificationRepository = new NotificationRepository()
