"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type TextRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  staggerAmount?: number
  once?: boolean
  as?: React.ElementType
}

export function TextReveal({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  staggerAmount = 0.03,
  once = true,
  as: Component = "div",
  ...props
}: TextRevealProps) {
  const { isReady } = useAnimation()
  const textRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isReady || !textRef.current || (once && hasAnimated.current)) return

    const setupAnimation = async () => {
      const { default: gsap } = await import("gsap")
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")
      const { default: SplitText } = await import("gsap/SplitText")

      // Register SplitText plugin
      gsap.registerPlugin(SplitText)

      // Split the text into characters
      const splitText = new SplitText(textRef.current, { type: "chars, words" })
      const chars = splitText.chars

      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
          markers: false,
        },
        onComplete: () => {
          hasAnimated.current = true
        },
      })

      // Animate each character
      tl.fromTo(
        chars,
        {
          y: 20,
          opacity: 0,
          rotationX: -20,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: staggerAmount,
          delay: delay,
          ease: "power2.out",
        },
      )

      // Clean up function
      return () => {
        splitText.revert()
      }
    }

    setupAnimation()
  }, [isReady, delay, threshold, staggerAmount, once, children])

  return (
    <Component ref={textRef} className={cn("", className)} {...props}>
      {children}
    </Component>
  )
}
