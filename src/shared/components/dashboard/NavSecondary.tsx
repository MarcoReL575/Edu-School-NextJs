"use client"

import Link from "next/link"
import * as React from "react"
import { IconSettings, IconSearch } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

const items = [
  {
    title: "Settings",
    url: "settings",
    icon: IconSettings,
  },
  {
    title: "Search",
    url: "search",
    icon: IconSearch,
  },
]

export function NavSecondary({ ...props }: React.ComponentProps<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props} className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link 
                  href={'/dashboard'}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
