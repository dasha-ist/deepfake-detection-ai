// frontend/components/main-footer.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import { FloatingElement } from "@/components/floating-element"

export function MainFooter() {
  const linkSections = [
    {
      title: "Product",
      links: [
        { href: "/coming-soon", label: "Pricing" },
        { href: "/coming-soon", label: "API" },
        { href: "/features", label: "Features" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/#how-it-works", label: "How It Works" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
        { href: "/gdpr", label: "GDPR" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-950/50 py-12 mt-20 relative z-10 border-t border-gray-800">
      <div className="container mx-auto px-4">

        {/* Top section: Logo, Blurb, and Link Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16">
          {/* Logo and Blurb Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <FloatingElement floatIntensity={0.5} rotateIntensity={2} duration={4}>
                <ShieldCheck className="h-8 w-8 text-purple-500" />
              </FloatingElement>
              <span className="text-xl font-bold">DeepFake Detector</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Protecting truth in the digital age with advanced AI-powered forensic tools.
            </p>
          </div>

          {/* Link Grid Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright and Social Icons */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} DeepFake Detector. All rights reserved.</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}