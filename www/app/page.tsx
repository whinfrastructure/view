"use client"

import { Swirl } from "@paper-design/shaders-react"
import { GrainOverlay } from "@/components/grain-overlay"
import { CollectionStrip } from "@/components/landing/collection-strip"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/landing/hero-section"
import { Navbar } from "@/components/navbar"
import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-media-query"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)
  const snapTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isSnapAnimatingRef = useRef(false)
  
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection()

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
      
      if (isMobile) {
        // Sur mobile, scroll vertical vers la section
        const sectionHeight = window.innerHeight
        scrollContainerRef.current.scrollTo({
          top: sectionHeight * index,
          behavior: "smooth",
        })
      } else {
        // Sur desktop, scroll horizontal
        const sectionWidth = scrollContainerRef.current.offsetWidth
        scrollContainerRef.current.scrollTo({
          left: sectionWidth * index,
          behavior: "smooth",
        })
      }
      
      setCurrentSection(index)
      
      // Reset flag after animation
      setTimeout(() => {
        isSnapAnimatingRef.current = false
      }, 600)
    }
  }

  const snapToNearestSection = () => {
    if (!scrollContainerRef.current || isSnapAnimatingRef.current || isMobile) return
    
    // Snap horizontal sur desktop uniquement
    const sectionWidth = scrollContainerRef.current.offsetWidth
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const nearestSection = Math.round(scrollLeft / sectionWidth)
    
    const currentScrollPosition = scrollLeft / sectionWidth
    const distanceFromNearest = Math.abs(currentScrollPosition - nearestSection)
    
    if (distanceFromNearest > 0.01) {
      scrollToSection(nearestSection)
    }
  }

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
  }, [currentSection, isMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        let newSection: number
        
        if (isMobile) {
          // Sur mobile, détection basée sur le scroll vertical
          const sectionHeight = window.innerHeight
          const scrollTop = scrollContainerRef.current.scrollTop
          newSection = Math.round(scrollTop / sectionHeight)
        } else {
          // Sur desktop, détection basée sur le scroll horizontal
          const sectionWidth = scrollContainerRef.current.offsetWidth
          const scrollLeft = scrollContainerRef.current.scrollLeft
          newSection = Math.round(scrollLeft / sectionWidth)
        }

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
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
  }, [currentSection, isMobile])

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

      <Navbar 
        currentSection={currentSection} 
        scrollToSection={scrollToSection} 
        isLoaded={isLoaded} 
      />

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${
          isMobile 
            ? "h-screen overflow-y-scroll snap-y snap-mandatory" 
            : "flex h-screen overflow-x-auto overflow-y-hidden"
        }`}
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {/* Hero Section with image slider */}
        <section 
          className={`shrink-0 ${isMobile ? "min-h-screen w-full snap-start flex items-center justify-center" : "w-screen h-screen flex"}`}
        >
          <HeroSection />
        </section>

        <section 
          className={`shrink-0 bg-white ${isMobile ? "min-h-screen w-full snap-start flex items-center justify-center py-12" : "w-screen h-screen flex items-center"}`}
        >
          <CollectionStrip />
        </section>
        <TestimonialsSection isMobile={isMobile} />
        <AboutSection scrollToSection={scrollToSection} isMobile={isMobile} />
        <ContactSection isMobile={isMobile} />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
