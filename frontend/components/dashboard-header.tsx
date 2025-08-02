// frontend/components/dashboard-header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogOut } from "lucide-react";
import { PulseDot } from "@/components/pulse-dot";

export function DashboardHeader() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    // This function signs the user out from Supabase
    await supabase.auth.signOut();
    
    // Redirect the user to the homepage and refresh the application state
    // to ensure the user session is cleared on the server.
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-sm z-30">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-purple-500" />
          <span className="text-lg font-bold">DeepFake Detector</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <PulseDot size="sm" color="green" pulseIntensity="subtle" />
            <span className="text-sm font-medium">Premium</span>
          </div>

          {/* --- UPDATED SIGN OUT BUTTON --- */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            onClick={handleSignOut}
          >
            {/* The icon is always visible */}
            <LogOut className="h-5 w-5 sm:mr-2" />
            
            {/* The "Sign Out" text is hidden on mobile (screens smaller than `sm`) */}
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}