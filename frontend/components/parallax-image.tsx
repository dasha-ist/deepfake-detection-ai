"use client"

import { useEffect, useRef } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  speed?: number
  threshold?: number
}

export function ParallaxImage({ src, alt, className, speed = 0.2, threshold = 0.2, ...props }: ParallaxImageProps) {
  const { isReady } = useAnimation()
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isReady || !imageRef.current || !containerRef.current) return

    const setupParallax = async () => {
      const { default: gsap } = await import("gsap")
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")

      // Create a smooth parallax effect
      gsap.to(imageRef.current, {
        yPercent: speed * 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      })
    }

    setupParallax()
  }, [isReady, speed, threshold])

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover transform scale-110"
        {...props}
      />
    </div>
  )
}
