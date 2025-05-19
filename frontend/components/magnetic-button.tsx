"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useAnimation } from "./animation-provider"
import { cn } from "@/lib/utils"

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  intensity?: number
  disabled?: boolean
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  intensity = 1,
  disabled = false,
  onClick,
  ...props
}: MagneticButtonProps) {
  const { isReady } = useAnimation()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isReady || !buttonRef.current || disabled) return

    const button = buttonRef.current
    let bounds: DOMRect

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      bounds = button.getBoundingClientRect()

      const x = clientX - bounds.left - bounds.width / 2
      const y = clientY - bounds.top - bounds.height / 2

      const magneticIntensity = intensity * 0.5

      button.style.transform = `translate(${x * magneticIntensity}px, ${y * magneticIntensity}px)`
    }

    const handleMouseLeave = () => {
      button.style.transform = `translate(0px, 0px)`
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isReady, intensity, disabled])

  return (
    <button
      ref={buttonRef}
      className={cn("transition-transform duration-200", className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
