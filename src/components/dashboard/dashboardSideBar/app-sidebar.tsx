"use client";

import * as React from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiActivity,
  FiUsers,
  FiBarChart2,
  FiBox,
} from "react-icons/fi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";

function WithHoverCard({
  condition,
  label,
  children,
  className = "w-full flex justify-center",
}: {
  condition: boolean;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!condition) return <>{children}</>;
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <div className={className}>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-auto px-3 py-1.5 text-xs">
        {label}
      </HoverCardContent>
    </HoverCard>
  );
}

// ============================
// User Routes
// ============================
const userNavItems = [
  { title: "Dashboard", url: "/dashboard/user/dashboard", icon: RxDashboard  },
  { title: "Task", url: "/dashboard/user/tasks", icon: FiBox },
  { title: "Analytics", url: "/dashboard/user/analytics", icon: FiActivity },
  { title: "Reports", url: "/dashboard/user/reports", icon: FiBarChart2 },
];

// ============================
// Admin Routes
// ============================
const adminNavItems = [
  { title: "Dashboard", url: "/dashboard/admin/dashboard", icon: RxDashboard },
  { title: "Manage Users", url: "/dashboard/admin/users", icon: FiUsers },
  {
    title: "System Analytics",
    url: "/dashboard/admin/analytics",
    icon: FiBarChart2,
  },
];

// ============================
// Main SideBar
// ============================
export function AppSidebar() {
  const { data: session } = useSession();
  const userRole = (session?.user as unknown as { role?: string })?.role;

  // if(userRole !== "USER" || userRole !== "ADMIN") {
  //   redirect("/unauthorized");
  // }

  // if(userRole === "USER") {
  //   redirect("/dashboard/user/dashboard");
  // } else if(userRole === "ADMIN") {
  //   redirect("/dashboard/admin/dashboard");
  // } 

  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const currentNavItems = userRole === "ADMIN" ? adminNavItems : userNavItems;
  

  return (
    <aside
      className={`relative border-r flex flex-col bg-white/45 justify-between py-4 transition-all duration-300 min-h-screen shrink-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Logo | Navigation List */}
      <div>
        <div
          className={`flex items-center px-3 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-2 overflow-hidden cursor-pointer flex-1"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                  <FiBox className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight truncate">
                  <span className="truncate font-semibold">Consista</span>
                  <span className="truncate text-[11px] text-muted-foreground">
                    {userRole} Profile
                  </span>
                </div>
              </Link>

              <WithHoverCard
                condition={true}
                label="Collapse Sidebar"
                className="flex justify-center"
              >
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="flex items-center cursor-pointer justify-center size-7 rounded-md border bg-parchment text-black transition-colors shrink-0"
                >
                  <BsLayoutSidebarInset />
                </button>
              </WithHoverCard>
            </>
          ) : (
            <WithHoverCard
              condition={true}
              label="Expand Sidebar"
              className="flex justify-center"
            >
              <button
                onClick={() => setIsCollapsed(false)}
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
              >
                <FiBox className="size-4" />
              </button>
            </WithHoverCard>
          )}
        </div>

        <hr className="my-5" />

        {/* Navigation List */}
        <nav className="flex flex-col gap-1 px-2">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;
            const linkContent = (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-parchment text-[#C27850] shadow-xs font-medium border-l-3 border-[#C27850]"
                    : "text-muted-foreground hover:bg-parchment hover:text-[#C27850]"
                } ${isCollapsed ? "justify-center px-0 w-full" : ""}`}
              >
                <Icon className="size-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );

            return (
              <WithHoverCard
                key={item.title}
                condition={isCollapsed}
                label={item.title}
              >
                {linkContent}
              </WithHoverCard>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile */}
      <div className="px-3 pt-4 border-t mt-auto cursor-pointer">
        <div
          className={`flex items-center gap-3 overflow-hidden ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="size-9 rounded-full object-cover shrink-0 border"
            />
          ) : (
            <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight truncate">
              <span className="truncate font-medium text-xs">
                {session?.user?.name || "User"}
              </span>
              <span className="truncate text-[10px] text-muted-foreground">
                {session?.user?.email || ""}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

