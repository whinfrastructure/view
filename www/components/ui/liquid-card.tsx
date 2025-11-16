"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  draggable?: boolean
  blurIntensity?: "sm" | "md" | "lg" | "xl"
  glowIntensity?: "none" | "xs" | "sm" | "md" | "lg"
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg"
  borderRadius?: string
}

export const LiquidGlassCard = ({
  children,
  className,
  draggable = true,
  blurIntensity = "md",
  glowIntensity = "md",
  shadowIntensity = "md",
  borderRadius = "24px",
}: LiquidGlassCardProps) => {
  const blurMap = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }

  const glowMap = {
    none: "",
    xs: "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    sm: "shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    md: "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    lg: "shadow-[0_0_40px_rgba(255,255,255,0.25)]",
  }

  const shadowMap = {
    none: "",
    xs: "shadow-sm",
    sm: "shadow-md",
    md: "shadow-lg",
    lg: "shadow-xl",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/20 bg-white/10",
        blurMap[blurIntensity],
        glowMap[glowIntensity],
        shadowMap[shadowIntensity],
        draggable ? "cursor-move" : "",
        className
      )}
      style={{
        borderRadius,
      }}
      draggable={draggable}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
