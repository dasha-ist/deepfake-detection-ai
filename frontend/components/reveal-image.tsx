"use client"

import { useEffect, useRef } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type RevealImageProps = {
  src: string
  alt: string
  className?: string
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  threshold?: number
}

export function RevealImage({
  src,
  alt,
  className,
  direction = "left",
  delay = 0,
  threshold = 0.2,
  ...props
}: RevealImageProps) {
  const { isReady } = useAnimation()
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isReady || !imageRef.current || !containerRef.current) return

    const setupAnimation = async () => {
      const { default: gsap } = await import("gsap")
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")

      // Set initial position based on direction
      let initialX = 0
      let initialY = 0

      switch (direction) {
        case "left":
          initialX = -100
          break
        case "right":
          initialX = 100
          break
        case "top":
          initialY = -100
          break
        case "bottom":
          initialY = 100
          break
      }

      // Create reveal animation
      gsap.fromTo(
        imageRef.current,
        {
          x: initialX,
          y: initialY,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top bottom-=${threshold * 100}%`,
            toggleActions: "play none none none",
          },
        },
      )
    }

    setupAnimation()
  }, [isReady, direction, delay, threshold])

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover opacity-0"
        {...props}
      />
    </div>
  )
}
