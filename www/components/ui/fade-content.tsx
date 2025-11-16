"use client"

import React from "react"
import { motion } from "motion/react"

interface FadeContentProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export const FadeContent = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
