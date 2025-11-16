"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  highlightClassName?: string
  titleClassName?: string
  description?: string
  descriptionClassName?: string
  align?: "left" | "center" | "right"
  className?: string
}

export const SectionHeader = ({
  badge,
  title,
  highlight,
  highlightClassName,
  titleClassName,
  description,
  descriptionClassName,
  align = "center",
  className,
}: SectionHeaderProps) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        
        .gradient-text {
          font-family: 'Dancing Script', cursive;
          background: linear-gradient(135deg, #d4c5b0 0%, #e8dcc8 50%, #f5ede0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <div className={cn("flex flex-col", alignmentClasses[align], className)}>
        {badge && (
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700 mb-4">
            {badge}
          </span>
        )}
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight",
            titleClassName
          )}
        >
          {title}{" "}
          {highlight && (
            <span className={cn("inline-block gradient-text", highlightClassName)}>
              {highlight}
            </span>
          )}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    </>
  )
}
