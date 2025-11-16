"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [matches, query])

  return matches
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)")
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1025px)")
}

export function useBreakpoint() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
  }
}
