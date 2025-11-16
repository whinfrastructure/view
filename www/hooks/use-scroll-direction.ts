"use client"

import { useEffect, useState } from "react"

type ScrollDirection = "horizontal" | "vertical"

export function useScrollDirection() {
  const [direction, setDirection] = useState<ScrollDirection>("horizontal")

  useEffect(() => {
    const checkOrientation = () => {
      // Sur mobile (< 768px), on force le scroll vertical
      if (window.innerWidth < 768) {
        setDirection("vertical")
      } else {
        setDirection("horizontal")
      }
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    
    return () => window.removeEventListener("resize", checkOrientation)
  }, [])

  return direction
}
