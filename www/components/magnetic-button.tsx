"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "lg"
  onClick?: () => void
}

export function MagneticButton({ 
  children, 
  variant = "primary", 
  size = "default",
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseClasses = "relative overflow-hidden rounded-full font-medium transition-all duration-300"
  const variantClasses = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
  }
  const sizeClasses = {
    default: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </motion.button>
  )
}
