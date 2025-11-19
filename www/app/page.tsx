"use client"

import { Swirl } from "@paper-design/shaders-react"
import { GrainOverlay } from "@/components/grain-overlay"
import { CollectionStrip } from "@/components/landing/collection-strip"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/landing/hero-section"
import { Navbar } from "@/components/navbar"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { useIsMobile } from "@/hooks/use-media-query"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)
  const snapTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isSnapAnimatingRef = useRef(false)
  
  const isMobile = useIsMobile()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = useCallback((index: number) => {
    if (!scrollContainerRef.current || isSnapAnimatingRef.current) return
    if (sectionRefs.current.length === 0) return

    const maxIndex = sectionRefs.current.length - 1
    const clampedIndex = Math.max(0, Math.min(index, maxIndex))
    isSnapAnimatingRef.current = true

    if (isMobile) {
      const target = sectionRefs.current[clampedIndex]
      if (target) {
        scrollContainerRef.current.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        })
      }
    } else {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * clampedIndex,
        behavior: "smooth",
      })
    }

    setCurrentSection(clampedIndex)

    setTimeout(() => {
      isSnapAnimatingRef.current = false
    }, 600)
  }, [isMobile])

  const snapToNearestSection = useCallback(() => {
    if (!scrollContainerRef.current || isSnapAnimatingRef.current || isMobile) return
    
    const sectionWidth = scrollContainerRef.current.offsetWidth
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const nearestSection = Math.round(scrollLeft / sectionWidth)
    
    const currentScrollPosition = scrollLeft / sectionWidth
    const distanceFromNearest = Math.abs(currentScrollPosition - nearestSection)
    
    if (distanceFromNearest > 0.01) {
      scrollToSection(nearestSection)
    }
  }, [isMobile, scrollToSection])

  useEffect(() => {
    // Sur desktop uniquement - convertir scroll vertical en horizontal avec snap
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }

        if (snapTimeoutRef.current) {
          clearTimeout(snapTimeoutRef.current)
        }
        snapTimeoutRef.current = setTimeout(() => {
          snapToNearestSection()
        }, 150)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
      }
    }
  }, [currentSection, isMobile, snapToNearestSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        if (sectionRefs.current.length === 0) {
          scrollThrottleRef.current = undefined
          return
        }

        if (isMobile) {
          const container = scrollContainerRef.current
          const scrollTop = container.scrollTop
          setIsAtTop(scrollTop <= 5)
          let closestIndex = currentSection
          let smallestDistance = Number.POSITIVE_INFINITY

          sectionRefs.current.forEach((section, index) => {
            if (!section) return
            const distance = Math.abs(section.offsetTop - scrollTop)
            if (distance < smallestDistance) {
              smallestDistance = distance
              closestIndex = index
            }
          })

          if (closestIndex !== currentSection) {
            setCurrentSection(closestIndex)
          }

          scrollThrottleRef.current = undefined
          return
        }

        // Sur desktop, détection basée sur le scroll horizontal
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
  setIsAtTop(scrollLeft <= 5)
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection < sectionRefs.current.length) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })

      // Snap uniquement sur desktop
      if (!isMobile) {
        if (snapTimeoutRef.current) {
          clearTimeout(snapTimeoutRef.current)
        }
        snapTimeoutRef.current = setTimeout(() => {
          snapToNearestSection()
        }, 150)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
      }
    }
  }, [currentSection, isMobile, snapToNearestSection])

  useEffect(() => {
    if (!scrollContainerRef.current) return
    if (isMobile) {
      setIsAtTop(scrollContainerRef.current.scrollTop <= 5)
    } else {
      setIsAtTop(scrollContainerRef.current.scrollLeft <= 5)
    }
  }, [isMobile])

  const sections = useMemo(() => ([
    {
      id: "hero",
      mobileClass: "w-full min-h-screen",
      desktopClass: "shrink-0 w-screen h-screen flex",
      render: () => <HeroSection isMobile={isMobile} />,
    },
    {
      id: "collection",
      mobileClass: "w-full flex items-center justify-center bg-white py-20",
      desktopClass: "shrink-0 w-screen h-screen flex items-center bg-white",
      render: () => <CollectionStrip />,
    },
    {
      id: "testimonials",
      mobileClass: "w-full",
      desktopClass: "shrink-0 w-screen h-screen flex",
      render: () => <TestimonialsSection isMobile={isMobile} />,
    },
    {
      id: "about",
      mobileClass: "w-full",
      desktopClass: "shrink-0 w-screen h-screen flex",
      render: () => <AboutSection scrollToSection={scrollToSection} isMobile={isMobile} />,
    },
    {
      id: "contact",
      mobileClass: "w-full",
      desktopClass: "shrink-0 w-screen h-screen flex",
      render: () => <ContactSection isMobile={isMobile} />,
    },
  ]), [isMobile, scrollToSection])

  const setSectionRef = (index: number) => (element: HTMLElement | null) => {
    sectionRefs.current[index] = element
  }

  return (
    <main className={`relative w-full bg-white ${isMobile ? "" : "h-screen overflow-hidden"}`}>
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-20" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <div className="h-full w-full relative">
          <Swirl
            colors={["#1275d8", "#e19136"]}
            speed={0.3}
          />
        </div>
      </div>

      <Navbar 
        currentSection={currentSection} 
        scrollToSection={scrollToSection} 
        isAtTop={isAtTop}
      />

      {isMobile ? (
        <div
          ref={scrollContainerRef}
          data-scroll-container
          className="relative z-10 transition-opacity duration-700 overflow-y-auto"
          style={{ 
            opacity: isLoaded ? 1 : 0,
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {sections.map((section, index) => (
            <section
              key={`${section.id}-mobile`}
              ref={setSectionRef(index)}
              className={section.mobileClass}
            >
              {section.render()}
            </section>
          ))}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          data-scroll-container
          className="relative z-10 transition-opacity duration-700 flex h-screen overflow-x-auto overflow-y-hidden"
          style={{ 
            opacity: isLoaded ? 1 : 0,
            scrollbarWidth: "none", 
            msOverflowStyle: "none"
          }}
        >
          {sections.map((section, index) => (
            <section
              key={`${section.id}-desktop`}
              ref={setSectionRef(index)}
              className={section.desktopClass}
            >
              {section.render()}
            </section>
          ))}
        </div>
      )}

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
