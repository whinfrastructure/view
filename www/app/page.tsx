"use client"

import { Swirl } from "@paper-design/shaders-react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { CollectionStrip } from "@/components/landing/collection-strip"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/landing/hero-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)
  const snapTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isSnapAnimatingRef = useRef(false)

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

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current && !isSnapAnimatingRef.current) {
      isSnapAnimatingRef.current = true
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
      
      // Reset flag after animation
      setTimeout(() => {
        isSnapAnimatingRef.current = false
      }, 600)
    }
  }

  const snapToNearestSection = () => {
    if (!scrollContainerRef.current || isSnapAnimatingRef.current) return
    
    const sectionWidth = scrollContainerRef.current.offsetWidth
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const nearestSection = Math.round(scrollLeft / sectionWidth)
    
    // Only snap if we're not already at the section
    const currentScrollPosition = scrollLeft / sectionWidth
    const distanceFromNearest = Math.abs(currentScrollPosition - nearestSection)
    
    if (distanceFromNearest > 0.01) {
      scrollToSection(nearestSection)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
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

        // Clear existing timeout and set new one for snap
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
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })

      // Clear existing timeout and set new one for snap
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
      }
      snapTimeoutRef.current = setTimeout(() => {
        snapToNearestSection()
      }, 150)
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
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
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

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-700 md:px-8 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${currentSection === 0 ? "text-white" : "text-black bg-white/80 backdrop-blur-md shadow-sm"}`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <svg 
            className={`h-8 w-8 transition-colors ${
              currentSection === 0 ? "text-white" : "text-black"
            }`}
            viewBox="0 0 226.26 214.71"
          >
            <polygon fill="currentColor" points="34.37 58.99 52.78 58.99 100.51 165.6 80.96 165.6 34.37 58.99"/>
            <polygon fill="currentColor" points="83.01 58.99 100.51 58.99 118.24 97.63 108.92 115.36 83.01 58.99"/>
            <polygon fill="currentColor" points="118.24 137.87 126.88 119.68 148.93 165.6 130.06 165.6 118.24 137.87"/>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="100.51" y1="155.37" x2="143.25" y2="60.58"/>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="125.28" y1="100.44" x2="173.48" y2="100.82"/>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="149.38" y1="154.24" x2="191.89" y2="61.95"/>
          </svg>
          <span className={`font-sans text-base font-semibold tracking-tight transition-colors ${
            currentSection === 0 ? "text-white" : "text-black"
          }`}>WelkomHome</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {["Accueil", "Logements", "Avis", "À Propos", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-xs font-medium transition-colors ${
                currentSection === index 
                  ? (currentSection === 0 ? "text-white" : "text-black")
                  : (currentSection === 0 ? "text-white/80 hover:text-white" : "text-black/60 hover:text-black")
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  currentSection === 0 ? "bg-white" : "bg-black"
                } ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToSection(4)}
          className={`rounded-full backdrop-blur-md px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
            currentSection === 0 
              ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" 
              : "bg-black text-white hover:bg-black/80"
          }`}
        >
          Réserver
        </button>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section with image slider */}
        <section className="flex min-h-screen w-screen shrink-0">
          <HeroSection />
        </section>

        <section className="flex min-h-screen w-screen shrink-0 items-center bg-white">
          <CollectionStrip />
        </section>
        <TestimonialsSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
