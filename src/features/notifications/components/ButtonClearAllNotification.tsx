'use client'

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/shared/components/ui/button"
import { clearAllNotificationAction } from "../actions/notificationsActions"
import { useSession } from "@/src/lib/auth-client";


export default function ButtonClearAllNotification() {
    const { data } = useSession();
    const queryClient = useQueryClient();

    const handleClearAllNotifications = async()=> {
        const { success, message } = await clearAllNotificationAction();
        if(!success) {
            toast.error(message);
        }
        if(success){
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ['notifications', data?.user.id]})
        }
    }

  return (
        <Button variant='outline' className="w-fit" onClick={handleClearAllNotifications}>
            Limpiar Notificaciones
        </Button>
  )
}



