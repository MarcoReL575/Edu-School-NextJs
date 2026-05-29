import { Metadata } from "next";
import { redirect } from "next/navigation";
import ButtonClearAllNotification from "@/src/features/notifications/components/ButtonClearAllNotification";
import CardNotifications from "@/src/features/notifications/components/CardNotifications";
import { notificationService } from "@/src/features/notifications/services/notificationService"
import { requireAuth } from "@/src/lib/auth-server"
import Heading from "@/src/shared/components/typography/Heading";

const title = 'Mis Notificaciones'

export const metadata: Metadata = {
  title: `Edu-School - ${title}`
}

export default async function NotificationsPage() {

  const { session } = await requireAuth();
  if(!session.user.id) redirect('/auth/signin');

  const notifications = await notificationService.getUserNotifications(session.user.id);

  return (
    <>
      <Heading level={2} className="mb-10">{title}</Heading>
      <ButtonClearAllNotification />
      <section className="grid grid-cols-1 px-10 gap-y-5">
        { notifications.length > 0  
          ?  notifications.map((notification)=> (
              <CardNotifications key={notification.id} notification={notification} />
            ))
          : <div className="text-center text-gray-400 font-semibold">
              Aún no tienes notificaciones
            </div>
      }
      </section>
    </>
  )
}
