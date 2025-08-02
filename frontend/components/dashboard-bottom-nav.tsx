"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/components/config/dashboard-nav";

export function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    // This nav is fixed to the bottom and only visible on screens smaller than 'md'
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        {dashboardNavItems.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
                isActive
                  ? "text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}