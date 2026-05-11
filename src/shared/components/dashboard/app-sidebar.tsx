import * as React from "react"
import { Sidebar, SidebarContent} from "../ui/sidebar"
import { NavMain } from "./NavMain"
import { NavSecondary } from "./NavSecondary"
import { TooltipProvider } from "../ui/tooltip"
import { Role } from "@/src/features/auth/types/auth-types"
import { NavAdmin } from "./NavAdmin"

export function AppSidebar({ userRole, ...props }: { userRole: Role } & React.ComponentProps<typeof Sidebar>) {
  return (
    <TooltipProvider>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarContent>
          <NavMain />
          {userRole === 'admin' && <NavAdmin />}
          <NavSecondary />
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}
