import { requireAuth } from "@/src/lib/auth-server";
import { AppSidebar } from "@/src/shared/components/dashboard/app-sidebar";
import { SiteHeader } from "@/src/shared/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {

  const { session } = await requireAuth();
  if(!session?.user) redirect('/auth/signin');

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar userRole ={session.user.role} variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}