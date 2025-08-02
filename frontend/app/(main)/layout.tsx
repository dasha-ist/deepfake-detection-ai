import type React from "react";
import { ParticleBackground } from "@/components/particle-background";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This is the structure that was previously in the root layout.
    <div className="relative isolate flex min-h-screen flex-col bg-black text-white">
      <ParticleBackground />
      <MainHeader />
      <main className="flex-grow">{children}</main>
      <MainFooter />
    </div>
  );
}