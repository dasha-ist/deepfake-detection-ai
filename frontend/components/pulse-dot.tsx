"use client"

import { useEffect, useRef } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type PulseDotProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "green" | "red" | "blue" | "purple"
  pulseIntensity?: "none" | "subtle" | "medium" | "strong"
}

export function PulseDot({
  className,
  size = "sm",
  color = "green",
  pulseIntensity = "subtle",
  ...props
}: PulseDotProps) {
  const { isReady } = useAnimation()
  const dotRef = useRef<HTMLDivElement>(null)

  // Map size to pixel values
  const sizeMap = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  // Map color to Tailwind classes
  const colorMap = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  }

  // Set up pulse animation if needed
  useEffect(() => {
    if (!isReady || !dotRef.current || pulseIntensity === "none") return

    const setupAnimation = async () => {
      const { default: gsap } = await import("gsap")

      // Different intensities for the pulse
      const intensityMap = {
        subtle: { scale: 1.2, opacity: 0.7, duration: 2 },
        medium: { scale: 1.4, opacity: 0.6, duration: 1.5 },
        strong: { scale: 1.6, opacity: 0.5, duration: 1 },
      }

      const settings = intensityMap[pulseIntensity]

      // Create the pulse animation
      gsap.to(dotRef.current, {
        scale: settings.scale,
        opacity: settings.opacity,
        duration: settings.duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    setupAnimation()
  }, [isReady, pulseIntensity])

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={dotRef}
        className={cn("rounded-full", sizeMap[size], colorMap[color], "shadow-sm shadow-green-500/30", className)}
        {...props}
      />
      {pulseIntensity !== "none" && (
        <div
          className={cn(
            "absolute rounded-full",
            sizeMap[size],
            "bg-green-500/30 animate-ping opacity-75",
            color === "green" && "bg-green-500/30",
            color === "red" && "bg-red-500/30",
            color === "blue" && "bg-blue-500/30",
            color === "purple" && "bg-purple-500/30",
          )}
        />
      )}
    </div>
  )
}
