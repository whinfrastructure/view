"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { GlassButton } from "@/components/ui/glass-button"

interface HeroSectionProps {
  isMobile: boolean
}

export function HeroSection({ isMobile }: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Image fixe - Plus de slider */}
      <div className="absolute inset-0 h-full">
        <Image
          src="/image.png"
          alt="Hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAAREjEFIUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8A0OC1FE95mRCXlVA7KCWKBjob7+nGVPkqkN2xLDGsaMxKqo0APQGMZ0Y5F1//2Q=="
        />
        {/* Gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Hero Content - Centré avec proportions élégantes */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full max-w-4xl px-4 mx-auto pt-16 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0px" }}
            animate={{ opacity: 1, letterSpacing: "2px" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-6 inline-block"
          >
            <span className="uppercase text-[9px] md:text-[10px] tracking-[0.4em] text-[#E6D5B8] font-medium border-b border-[#E6D5B8]/30 pb-3">
              L&apos;art de vivre méditerranéen
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white mb-6 leading-[1.05] flex flex-col items-center">
            <span className="font-playfair italic font-light text-white/90 mb-2 text-2xl sm:text-3xl md:text-4xl">Venez découvrir</span>
            <span className="font-playfair uppercase tracking-[0.1em] text-[#E6D5B8] drop-shadow-lg block">La Côte d&apos;Azur</span>
            <span className="font-mea-culpa text-5xl sm:text-7xl md:text-[7rem] -mt-2 sm:-mt-4 text-white/90 leading-normal" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)"}}>
              différemment
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base font-light text-white/80 mb-8 md:mb-10 leading-relaxed max-w-md instrument border-t-[0.5px] border-[#E6D5B8]/30 pt-5">
            Une sélection exclusive de villas de prestige. L&apos;élégance, le service sur-mesure et l&apos;intimité que vous méritez sur la French Riviera.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border-[0.5px] border-[#E6D5B8]/30 hover:bg-[#E6D5B8]/10 text-white font-playfair text-lg italic tracking-wide transition-all duration-500 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-4 text-center">
                Explorer nos villas
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2 text-[#E6D5B8]">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E6D5B8]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
            <button className="text-white/80 hover:text-[#E6D5B8] font-sans uppercase tracking-[0.25em] text-[10px] transition-all duration-500 relative flex items-center justify-center gap-2 group py-2">
              <span className="relative">
                Contact Privé
                <span className="absolute -bottom-2 left-1/2 -transform -translate-x-1/2 w-0 h-[0.5px] bg-[#E6D5B8] transition-all duration-500 group-hover:w-full"></span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Transition douce vers le blanc - Visible seulement sur desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent pointer-events-none z-30" />
      
      {/* Swipe/Scroll Indicator - Right aligned on desktop */}
      {!isMobile && (
        <motion.div
          className="absolute right-6 sm:right-12 md:right-24 bottom-24 z-30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-white/60 text-[10px] tracking-[0.3em] font-light uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Découvrir
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg 
                className="w-4 h-4 text-[#E6D5B8] drop-shadow-lg" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
