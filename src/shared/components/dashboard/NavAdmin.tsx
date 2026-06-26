'use client'

import { Route } from "next"
import Link from "next/link"
import clsx from "clsx"
import { IconCalendar, IconFolderPlus, IconSchool, IconSpeakerphone, IconUsers, IconUserShield } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname } from "next/navigation"

const items = [
  { title: "Grupos", url: "groups", icon: IconFolderPlus },
  { title: "Clases", url: "clases", icon: IconFolderPlus },
  { title: "Maestros", url: "#", icon: IconSchool } ,
  { title: "Padre/Tutor", url: "#", icon: IconUserShield },
  { title: "Estudiantes", url: "students", icon: IconUsers, },
]

const menu = [
  { title: "Eventos", url: "#", icon: IconCalendar },
  { title: "Anuncios", url: "anuncios", icon: IconSpeakerphone },
]


export function NavAdmin() {

  const pathname = usePathname()

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel className="text-lg text-gray-400">Menu General</SidebarGroupLabel>
        <SidebarMenu>
          {menu.map((menu) => (
            <SidebarMenuItem key={menu.title} className="gap-y-2">
              <SidebarMenuButton asChild>
                <Link 
                  href={`/dashboard/${menu.url}` as Route} 
                  className={clsx('text-xl flex items-center transition-all duration-300 ease-in', 
                    pathname.includes(menu.url) && 'bg-black/80 text-white'
                  )}
                >
                  <menu.icon className="scale-150" />
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>  
      </SidebarGroup>
      
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="text-lg text-gray-400">Herramientas Administrador</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="gap-y-2">
              <SidebarMenuButton asChild>
                <Link 
                  href={`/dashboard/${item.url}` as Route} 
                  className={clsx('text-xl flex items-center transition-all duration-300 ease-in', 
                    pathname.includes(item.url) && 'bg-black/80 text-white'
                  )}
                >
                  <item.icon className="scale-150" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
