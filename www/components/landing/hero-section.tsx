"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { GlassButton } from "@/components/ui/glass-button"

export function HeroSection() {
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
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Hero Content - Même style que l'original */}
      <div className="absolute bottom-8 left-8 z-20 max-w-lg md:left-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-left"
        >
          {/* Badge */}
          <GlassButton size="sm" className="mb-4">
            <span className="text-white/90 text-xs font-light">✨ Côte d'Azur Exclusive</span>
          </GlassButton>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl tracking-tight font-light text-white mb-4">
            <span className="font-medium italic">Venez découvrir</span>
            <br />
            <span className="font-light tracking-tight text-white">la Côte d'Azur</span>
            <br />
            <span className="italic font-light">différemment</span>
          </h1>

          {/* Description */}
          <p className="text-xs font-light text-white/70 mb-4 leading-relaxed max-w-md">
            Nos logements en exclusivité sur la Côte d'Azur. Des villas d'exception que vous ne trouverez nulle part ailleurs.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <GlassButton size="default">
              Découvrir nos logements
            </GlassButton>
            <button className="px-6 py-3.5 rounded-full bg-white text-black font-medium text-base transition-all duration-200 hover:bg-white/90 cursor-pointer">
              Contactez-nous
            </button>
          </div>
        </motion.div>
      </div>

      {/* Transition douce vers le blanc - Très fine */}
      <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white/90 via-white/40 to-transparent pointer-events-none z-30" />
      
      {/* Texte animé "Swipe" - Côté droit */}
      <motion.div
        className="absolute right-12 top-1/2 -translate-y-1/2 z-30"
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
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-white text-sm font-light mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Glissez
            </p>
            <p className="text-white/70 text-xs font-light" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Swipe →
            </p>
          </div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-6 h-6 text-white drop-shadow-lg" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
