'use client'
import Link from "next/link"
import toast from "react-hot-toast"
import { Route } from "next"
import { formatDateNotification } from "@/src/shared/utils/dateNotification"
import { NotificationSelect } from "../types/types"
import { clearSingleNotificationAction } from "../actions/notificationsActions"
import clsx from "clsx"

type Props = {
  notification: NotificationSelect
}

export default function CardNotifications({ notification }: Props) {

  const handleClearNotification = async()=> {
    const { success, message } = await clearSingleNotificationAction(notification.id);
    if(!success) {
      toast.error(message);
    }
  }

  return (
    <>
      <div className={clsx("flex items-center max-w-2xl border rounded-lg p-4 gap-x-4 ", notification.isRead && 'bg-')}>
        {!notification.isRead && (
          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
        )}
        <div  className="w-full">
          <Link 
            href={notification.redirectUrl as Route}
            className="flex justify-between items-center w-full hover:underline transition-all duration-300 ease-in"
            onClick={handleClearNotification}
          >
            <h4 className={clsx("text-sm font-semibold", notification.isRead ? "text-gray-400" : "text-black")}>
              {notification.title}
            </h4>
            <span className="text-sm text-gray-400">{formatDateNotification(notification.createdAt)}</span>
          </Link>
          <p className={clsx("text-xs leading-relaxed font-semibold", notification.isRead ? "text-gray-400" : "text-gray-600")}>
            {notification.message}
          </p>
        </div>
      </div>
    </>
  )
}
