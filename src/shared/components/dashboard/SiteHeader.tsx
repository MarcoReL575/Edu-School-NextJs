'use client'

import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import Pusher from 'pusher-js';
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "./NavUser";
import { FullSession } from "@/src/lib/auth-server";
import { DynamicBreadcrumbs } from "./DynamicBreadcrumbs";
import { useEffect, useState } from "react";
import { NotificationSelect } from "@/src/features/notifications/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountNotificationsAction } from "@/src/features/notifications/actions/notificationsActions";

type Props = {
  session: FullSession;
  notifications: number
}

export function SiteHeader({ session, notifications }: Props) {

  const queryClient = useQueryClient();

  const { data: totalCountNotifications, isLoading, isError} = useQuery({
    queryKey: ['notifications-count', session.user.id],
    queryFn: ()=> getCountNotificationsAction(),
  })

  useEffect(()=> {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    });

    const id = `notifications-channel-${session.user.id}`;
    const channel = pusher.subscribe(id)
    channel.bind('new-notification', ()=> {
      queryClient.invalidateQueries({ queryKey: ['notifications-count', session.user.id] })
    })

    return ()=> {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [session]);

  if(isLoading) return <div>Cargando notificaciones...</div>
  if(isError || totalCountNotifications === undefined) return <div>Error al cargar las notificaciones</div>
  

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumbs />
        <div className="ml-auto flex items-center gap-x-4">
          <Link 
            href={'/dashboard/notifications'}
            className=" relative rounded-full flex items-center justify-center p-1 border border-black cursor-pointer hover:bg-gray-100"
          >
            <IconBell />
            { totalCountNotifications.notifications > 0 && 
              <div className="absolute text-sm font-semibold -right-2 -top-2 rounded-full px-1.5 flex items-center justify-center bg-red-500 text-white">
                {totalCountNotifications.notifications}
              </div>
            }
          </Link>
          <NavUser user={session.user} />
        </div>
      </div>
    </header>
  )
}
