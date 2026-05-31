'use client'

import { useEffect, useState } from "react";
import { NotificationSelect } from "../types/types";
import Pusher from "pusher-js";
import { FullSession } from "@/src/lib/auth-server";
import CardNotifications from "./CardNotifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotificationsAction } from "../actions/notificationsActions";



type Props = {
    session: FullSession;
}

export default function GridNotifications({ session }: Props) {
    const queryClient = useQueryClient();

    const { data: totalNotifications, isLoading, isError} = useQuery({
        queryKey: ['notifications', session.user.id],
        queryFn: () => getNotificationsAction(),
    });

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        });

        const id = `notifications-channel-${session.user.id}`;
        const channel = pusher.subscribe(id)
        channel.bind('new-notification', (notification: NotificationSelect) => {
            queryClient.invalidateQueries({ queryKey: ['notifications', session.user.id] });
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [session.user.id]);

    if(isLoading || !totalNotifications) return <div>Cargando...</div>;
    if(isError) return <div>Error al cargar las notificaciones</div>

    return (
        <section className="grid grid-cols-1 px-10 gap-y-5">
            {totalNotifications.length > 0
                ? totalNotifications.map((notification) => (
                    <CardNotifications key={notification.id} notification={notification} />
                ))
                : <div className="text-center text-gray-400 font-semibold">
                    Aún no tienes notificaciones
                </div>
            }
        </section>
    )
}
