"use client"

import Link from "next/link"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ComingSoonPage() {
  return (
    <>
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            <div className="mb-8">
              <Rocket className="h-24 w-24 mx-auto text-purple-500 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Coming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Soon
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-xl mx-auto mt-6 mb-10">
              We're working hard to launch this page. Stay tuned for exciting new updates!
            </p>

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
      </div>
    </>
  )
}