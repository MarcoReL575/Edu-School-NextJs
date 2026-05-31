import { Metadata } from "next";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import ButtonClearAllNotification from "@/src/features/notifications/components/ButtonClearAllNotification";
import { requireAuth } from "@/src/lib/auth-server"
import Heading from "@/src/shared/components/typography/Heading";
import GridNotifications from "@/src/features/notifications/components/GridNotifications";
import { getNotificationsAction } from "@/src/features/notifications/actions/notificationsActions";

const title = 'Mis Notificaciones'

export const metadata: Metadata = {
  title: `Edu-School - ${title}`
}

export default async function NotificationsPage() {

  const queryClient = new QueryClient();
  const { session } = await requireAuth();
  if (!session.user.id) redirect('/auth/signin');

  await queryClient.prefetchQuery({
    queryKey: ['notifications', session.user.id],
    queryFn: ()=> getNotificationsAction(),
  })

  return (
    <>
      <Heading level={2} className="mb-10">{title}</Heading>
      <ButtonClearAllNotification />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GridNotifications session={session} />
      </HydrationBoundary>
    </>
  )
}
