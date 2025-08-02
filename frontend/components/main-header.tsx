"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Menu, X } from "lucide-react"
import { FloatingElement } from "@/components/floating-element"
import { MagneticButton } from "@/components/magnetic-button"
import { AuthModal } from "@/components/auth-modal"

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Effect to prevent body scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
    { href: "/coming-soon", label: "Pricing" },
  ]

  return (
    <header className="container mx-auto py-6 px-4 flex items-center justify-between relative z-40">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
        <FloatingElement floatIntensity={0.5} rotateIntensity={2} duration={4}>
          <ShieldCheck className="h-8 w-8 text-purple-500" />
        </FloatingElement>
        <span className="text-xl font-bold">DeepFake Detector</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <AuthModal>
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Login
          </Button>
        </AuthModal>
        <MagneticButton intensity={0.8}>
          <Link href="/upload">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              Try Now
            </Button>
          </Link>
        </MagneticButton>
      </div>

      {/* Mobile Menu Button (Hamburger) */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)} // This button now ONLY opens the menu
          aria-label="Open menu"
          className="w-12 h-12" // Larger touch area for the button
        >
          <Menu className="h-9 w-9" /> {/* <-- INCREASED ICON SIZE */}
        </Button>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col"
        >
          {/* Dedicated Close Button (Top Right) */}
          <div className="absolute top-6 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12" // Larger touch area
              >
                <X className="h-9 w-9" /> {/* <-- LARGE CLOSE ICON */}
              </Button>
          </div>

          <div className="container mx-auto px-4 flex-grow flex flex-col justify-between pt-32 pb-12">
            {/* Navigation Links - Centered */}
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-medium text-gray-200 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Action Buttons - At the bottom */}
            <div className="flex flex-col items-center gap-4 w-full">
              <AuthModal>
                <Button variant="outline" className="w-full max-w-xs border-gray-700 text-gray-300 text-lg py-6">
                  Login
                </Button>
              </AuthModal>
              <Link href="/upload" className="w-full max-w-xs" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-lg py-6">
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}