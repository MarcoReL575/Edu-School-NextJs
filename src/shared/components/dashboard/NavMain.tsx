'use client'

import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { IconBooks, IconCalendar, IconChecklist, IconClipboardText, IconHome, IconMessage, IconNotes, IconSchool, IconSpeakerphone, IconUserCheck, IconUsers, IconUserShield, type Icon } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

const items = [
  { title: "Inicio", url: "home", icon: IconHome },
  { title: "Mis Clases", url: "mis-clases", icon: IconBooks },
  { title: "Tareas", url: "#", icon: IconNotes },
  { title: "Trabajos", url: "#", icon: IconNotes },
  { title: "Examenes", url: "#", icon: IconClipboardText },
  { title: "Asistencias", url: "#", icon: IconUserCheck },
  { title: "Resultados", url: "#", icon: IconChecklist },
  { title: "Eventos", url: "#", icon: IconCalendar },
  { title: "Mensajes", url: "#", icon: IconMessage },
  { title: "Anuncios", url: "#", icon: IconSpeakerphone },
]


export function NavMain() {

  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className=" space-y-2">
          {items.map((item) => {
            const isActive = pathname === `/dashboard/${item.url}` || pathname.startsWith(`/dashboard/${item.url}/`);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} className="text-lg">
                  <Link
                    href={`/dashboard/${item.url}` as Route}
                    className={clsx('flex items-center gap-x-2 w-full p-1 rounded-lg',
                      isActive && 'bg-black/80 text-white'
                    )}
                  >
                    {item.icon && <item.icon className=" scale-150" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
