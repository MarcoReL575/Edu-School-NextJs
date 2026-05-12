
import { IconBell } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "./NavUser";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import { DynamicBreadcrumbs } from "./DynamicBreadcrumbs";

export async function SiteHeader() {

  const { session } = await requireAuth();
  if(!session?.user) redirect('/auth/signup');

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
          <div className="rounded-full flex items-center justify-center p-1 border border-black cursor-pointer hover:bg-gray-100">
            <IconBell />
          </div>
          <NavUser user={session.user} />
        </div>
      </div>
    </header>
  )
}
