"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type ParallaxSectionProps = {
  children: ReactNode
  className?: string
  speed?: number
  backgroundEffect?: "gradient" | "particles" | "wave" | "none"
  intensity?: number
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  backgroundEffect = "none",
  intensity = 0.5,
  ...props
}: ParallaxSectionProps) {
  const { isReady } = useAnimation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isReady || !sectionRef.current || !contentRef.current) return

    const setupParallax = async () => {
      const { default: gsap } = await import("gsap")
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")

      // Create a smooth parallax effect for the content
      gsap.to(contentRef.current, {
        y: `${speed * 100}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      })

      // Background effect
      if (backgroundRef.current && backgroundEffect !== "none") {
        if (backgroundEffect === "gradient") {
          // Animate gradient rotation
          gsap.to(backgroundRef.current, {
            backgroundPosition: `${100 + intensity * 200}% ${100 + intensity * 200}%`,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        } else if (backgroundEffect === "wave" && backgroundRef.current) {
          // Create wave effect
          const wave = document.createElement("div")
          wave.className = "absolute inset-0 opacity-20"
          wave.style.background = `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${intensity * 0.5}), transparent 70%)`
          backgroundRef.current.appendChild(wave)

          gsap.to(wave, {
            scale: 1.5 + intensity,
            opacity: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        }
      }

      // Create particles if needed
      if (particlesRef.current && backgroundEffect === "particles") {
        const particleCount = Math.floor(20 * intensity)

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div")
          particle.className = "absolute rounded-full bg-purple-500/20"

          // Random size between 4px and 20px
          const size = 4 + Math.random() * 16
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`

          // Random position
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`

          particlesRef.current.appendChild(particle)

          // Animate each particle
          gsap.to(particle, {
            y: `${(Math.random() - 0.5) * 200 * intensity}px`,
            x: `${(Math.random() - 0.5) * 100 * intensity}px`,
            opacity: Math.random() * 0.5,
            duration: 3 + Math.random() * 5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          })
        }
      }
    }

    setupParallax()
  }, [isReady, speed, backgroundEffect, intensity])

  return (
    <div ref={sectionRef} className={cn("relative overflow-hidden", className)} {...props}>
      {backgroundEffect !== "none" && (
        <div
          ref={backgroundRef}
          className={cn(
            "absolute inset-0 -z-10 transition-opacity duration-1000",
            backgroundEffect === "gradient" &&
              "bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 bg-[length:200%_200%] bg-[position:0%_0%]",
          )}
        />
      )}
      {backgroundEffect === "particles" && <div ref={particlesRef} className="absolute inset-0 -z-10" />}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  )
}
