"use client"

import Link from "next/link"
import { ShieldCheck, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming this path is correct from your project setup

// This is a self-contained "Coming Soon" page.
// All necessary elements (navigation, footer, and content) are included in this single file.

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      {/* Navigation (Copied from Privacy Page for consistency) */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-purple-500" />
          </div>
          <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/auth" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Try Now
          </Button>
        </div>
      </nav>

      {/* Main "Coming Soon" Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Pulsing Icon */}
            <div className="mb-8">
              <Rocket className="h-24 w-24 mx-auto text-purple-500 animate-pulse" />
            </div>

            {/* Header with Gradient */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Coming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Soon
              </span>
            </h1>

            {/* Sub-heading message */}
            <p className="text-xl text-gray-400 max-w-xl mx-auto mt-6 mb-10">
              We're working hard to launch this page. Stay tuned for exciting new updates!
            </p>

            {/* Call to Action Button */}
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer (Copied from Privacy Page for consistency) */}
      <footer className="border-t border-gray-800/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo + Title */}
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-gray-300">DeepFake Detector</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
              <Link href="/gdpr" className="text-gray-400 hover:text-white transition-colors">
                GDPR
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}