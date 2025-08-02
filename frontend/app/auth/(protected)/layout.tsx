// frontend/app/auth/(protected)/layout.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardBottomNav } from "@/components/dashboard-bottom-nav";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    // This structure allows the header to be sticky and the content to scroll independently
    <div className="flex h-screen flex-col bg-gray-950">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Add padding to the content area. The bottom padding is crucial on mobile 
              to prevent content from being hidden behind the bottom navigation bar. */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
            {children}
          </div>
        </main>
      </div>
      <DashboardBottomNav />
    </div>
  );
}