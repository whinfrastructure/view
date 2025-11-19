"use client"

import { useCallback, useSyncExternalStore } from "react"

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {}
    }

    const media = window.matchMedia(query)
    const handler = () => callback()
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [query])

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false
    }
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
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
