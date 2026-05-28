import { IconBell } from "@tabler/icons-react";
import { Suspense, use } from "react";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "./NavUser";
import { FullSession } from "@/src/lib/auth-server";
import { DynamicBreadcrumbs } from "./DynamicBreadcrumbs";
import { notificationService } from "@/src/features/notifications/services/notificationService";
import Link from "next/link";

type Props = {
  session: FullSession
}

export async function SiteHeader({ session }: Props) {

  const notifications = await notificationService.getCountNotificationsUser(session.user.id);

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
            { notifications > 0 && 
              <div className="absolute text-sm font-semibold -right-2 -top-2 rounded-full px-1.5 flex items-center justify-center bg-red-500 text-white">
                {notifications}
              </div>
            }
          </Link>
          <NavUser user={session.user} />
        </div>
      </div>
    </header>
  )
}
