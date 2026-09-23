import { AppSidebar } from "@/components/dashboard/dashboardSideBar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        {/* =========================== */}
        {/* Shadcn Sidebar */}
        {/* =========================== */}
        <AppSidebar />

        {/* =========================== */}
        {/* Side Content */}
        {/* =========================== */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-6 overflow-y-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

