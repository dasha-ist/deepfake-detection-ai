"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type AnimationContextType = {
  isReady: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Import GSAP and ScrollTrigger dynamically to avoid SSR issues
    const loadGSAP = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)

      // Set smooth scrolling
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      })

      // Mark animations as ready to be initialized
      setIsReady(true)
    }

    loadGSAP()

    return () => {
      // Clean up ScrollTrigger on unmount
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        ScrollTrigger.clearMatchMedia()
      })
    }
  }, [])

  return <AnimationContext.Provider value={{ isReady }}>{children}</AnimationContext.Provider>
}
