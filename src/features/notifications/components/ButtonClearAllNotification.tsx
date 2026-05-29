'use client'

import { Button } from "@/src/shared/components/ui/button"
import { clearAllNotificationAction } from "../actions/notificationsActions"
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function ButtonClearAllNotification() {

    const handleClearAllNotifications = async()=> {
        const { success, message } = await clearAllNotificationAction();
        if(!success) {
            toast.error(message);
        }
        if(success){
            toast.success(message);
            redirect('/dashboard/notifications');
        }
    }

  return (
        <Button variant='outline' className="w-fit" onClick={handleClearAllNotifications}>
            Limpiar Notificaciones
        </Button>
  )
}



