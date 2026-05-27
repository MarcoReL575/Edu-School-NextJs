import { db } from "@/src/db"
import { NotificationInsert, NotificationSelect } from "../types/types"
import { notifications, students } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export interface INotificationRepository {
    insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]>
}

class NotificationRepository implements INotificationRepository {
    async insertMany(notification: NotificationInsert[]): Promise<NotificationSelect[]> {
        const result = await db 
            .insert(notifications)
            .values(notification)
            .returning()
        return result;
    }
}

export const notificationRepository = new NotificationRepository()
