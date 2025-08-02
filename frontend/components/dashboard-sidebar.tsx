// frontend/components/dashboard-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/components/config/dashboard-nav";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    // This sidebar is hidden on mobile and becomes a flex column on 'md' screens and up
    <aside className="hidden md:flex md:flex-col md:w-64 border-r border-gray-800 bg-gray-950/50">
      <div className="p-4">
        <nav className="space-y-2">
          {dashboardNavItems.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}