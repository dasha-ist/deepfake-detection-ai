"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type FloatingElementProps = {
  children: ReactNode
  className?: string
  floatIntensity?: number
  rotateIntensity?: number
  delay?: number
  duration?: number
}

export function FloatingElement({
  children,
  className,
  floatIntensity = 1,
  rotateIntensity = 0,
  delay = 0,
  duration = 3,
  ...props
}: FloatingElementProps) {
  const { isReady } = useAnimation()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isReady || !elementRef.current) return

    const setupAnimation = async () => {
      const { default: gsap } = await import("gsap")

      // Create floating animation
      gsap.to(elementRef.current, {
        y: `${10 * floatIntensity}px`,
        rotation: rotateIntensity,
        duration: duration,
        delay: delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    }

    setupAnimation()
  }, [isReady, floatIntensity, rotateIntensity, delay, duration])

  return (
    <div ref={elementRef} className={cn(className)} {...props}>
      {children}
    </div>
  )
}
