"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "scale-in" | "stagger" | "parallax"
  delay?: number
  duration?: number
  threshold?: number
  id?: string
  staggerChildren?: string
  staggerAmount?: number
  yOffset?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  id,
  staggerChildren,
  staggerAmount = 0.1,
  yOffset = 30,
  once = true,
  ...props
}: AnimatedSectionProps) {
  const { isReady } = useAnimation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isReady || !sectionRef.current || (once && hasAnimated.current)) return

    const setupAnimation = async () => {
      const { default: gsap } = await import("gsap")
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")

      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
          markers: false,
        },
        onComplete: () => {
          hasAnimated.current = true
        },
      })

      // Apply different animations based on the animation prop
      switch (animation) {
        case "fade-up":
          tl.fromTo(
            sectionRef.current,
            {
              y: yOffset,
              opacity: 0,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
            {
              y: 0,
              opacity: 1,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
          )
          break

        case "fade-in":
          tl.fromTo(
            sectionRef.current,
            {
              opacity: 0,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
            {
              opacity: 1,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
          )
          break

        case "scale-in":
          tl.fromTo(
            sectionRef.current,
            {
              scale: 0.95,
              opacity: 0,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
            {
              scale: 1,
              opacity: 1,
              duration: duration,
              delay: delay,
              ease: "power2.out",
            },
          )
          break

        case "stagger":
          if (staggerChildren && sectionRef.current) {
            const children = sectionRef.current.querySelectorAll(staggerChildren)
            tl.fromTo(
              children,
              {
                y: yOffset,
                opacity: 0,
                duration: duration,
                ease: "power2.out",
              },
              {
                y: 0,
                opacity: 1,
                duration: duration,
                stagger: staggerAmount,
                delay: delay,
                ease: "power2.out",
              },
            )
          }
          break

        case "parallax":
          tl.fromTo(
            sectionRef.current,
            {
              y: yOffset * 2,
              duration: duration * 1.5,
              delay: delay,
              ease: "power1.out",
            },
            {
              y: 0,
              duration: duration * 1.5,
              delay: delay,
              ease: "power1.out",
            },
          )
          break
      }
    }

    setupAnimation()

    return () => {
      // Cleanup if needed
    }
  }, [isReady, animation, delay, duration, threshold, staggerChildren, staggerAmount, yOffset, once])

  return (
    <div ref={sectionRef} className={cn("", className)} id={id} {...props}>
      {children}
    </div>
  )
}
