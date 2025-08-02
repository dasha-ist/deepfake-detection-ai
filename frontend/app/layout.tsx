import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepFake Detector - AI-Powered Forensics Tool",
  description:
    "Advanced AI tool to detect deepfake images with industry-leading accuracy. Protect yourself from the growing threat of manipulated media.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            {/* The structural div and components are removed. We only render children directly. */}
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}