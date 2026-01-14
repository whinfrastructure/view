"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import { GooeyText } from "@/components/ui/gooey-text"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface AboutSectionProps {
  scrollToSection: (index: number) => void
  isMobile?: boolean
}

export function AboutSection({ scrollToSection, isMobile = false }: AboutSectionProps) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section 
      ref={ref}
      className={`relative flex shrink-0 items-center justify-center bg-white overflow-hidden ${isMobile ? "w-full py-20 px-4" : "w-screen h-screen px-12"}`}
    >
      {/* Decorative background elements - optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-blue-50/30 rounded-full blur-2xl will-change-auto" />
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-orange-50/30 rounded-full blur-2xl will-change-auto" />
      </div>

      <div className={`relative w-full max-w-7xl mx-auto z-10 ${isMobile ? "flex flex-col gap-12" : "grid grid-cols-12 gap-12 items-center"}`}>
        
        {/* Text Content */}
        <div className={`${isMobile ? "w-full" : "col-span-6 lg:col-span-5"}`}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-neutral-300"></span>
              <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">Notre Histoire</span>
            </div>

            <div className="mb-6 h-16 md:h-20 flex items-center">
               <GooeyText
                texts={["L'ART DE", "RECEVOIR", "SUR MESURE"]}
                morphTime={2}
                cooldownTime={2}
                className="font-bold leading-tight"
                textClassName={isMobile ? "text-3xl text-neutral-900" : "text-4xl lg:text-5xl text-neutral-900"}
              />
            </div>

            <p className="text-neutral-600 text-base leading-relaxed mb-6">
              WelkomHome redéfinit l&apos;expérience de la location saisonnière sur la Côte d&apos;Azur. 
              Née de la passion de Yohan & Shirley, notre agence cultive l&apos;excellence et la proximité 
              pour offrir des séjours inoubliables.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Sélection rigoureuse de propriétés de prestige",
                "Conciergerie privée disponible 7j/7",
                "Expérience locale authentique et exclusive"
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3"
                >
                  <div className="shrink-0 w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-neutral-600 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection(4)}
              className="group flex items-center gap-3 text-neutral-900 font-semibold border-b-2 border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-all"
            >
              <span>Rencontrer l&apos;équipe</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Image Composition */}
        <div className={`${isMobile ? "w-full" : "col-span-6 lg:col-span-7 relative"}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Main Image - Optimized */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-4/3 max-w-sm lg:max-w-md mx-auto">
              <Image
                src="/daronnedaron.jpg"
                alt="Yohan & Shirley - Fondateurs WelkomHome"
                fill
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
              
              
            </div>

            {/* Decorative element - simplified */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-neutral-100/50 rounded-full -z-10 hidden lg:block" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
