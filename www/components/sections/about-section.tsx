"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import { GooeyText } from "@/components/ui/gooey-text"

interface AboutSectionProps {
  scrollToSection: (index: number) => void
  isMobile?: boolean
}

export function AboutSection({ scrollToSection, isMobile = false }: AboutSectionProps) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section 
      ref={ref}
      className={`flex shrink-0 items-center justify-center bg-white ${isMobile ? "w-full py-20 px-4" : "w-screen h-screen px-6 py-20 md:px-12"}`}
    >
      <div className={`w-full max-w-7xl mx-auto ${isMobile ? "" : ""}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 items-center ${isMobile ? "gap-8" : "gap-12 lg:gap-16"}`}>
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl bg-neutral-100 ${isMobile ? "" : ""}`}>
              <img
                src="/media/about.jpg"
                alt="Équipe WelkomHome"
                className="w-full h-full object-cover"
              />
              
              {/* Badge overlay */}
              <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white rounded-2xl shadow-xl ${isMobile ? "px-4 py-3" : "px-6 py-4"}`}>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={isMobile ? "text-3xl" : "text-4xl"}>🏡</div>
                  <div className={isMobile ? "text-xs" : "text-sm"}>
                    <p className="font-semibold text-neutral-900">Yohan & Shirley</p>
                    <p className="text-neutral-600 text-[10px] md:text-xs">Fondateurs</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={isMobile ? "space-y-4" : "space-y-8"}
          >
            {/* Gooey Title */}
            <div className={isMobile ? "h-[80px] flex items-center" : "h-[120px] flex items-center"}>
              <GooeyText
                texts={["WELKOM", "HOME", "LUXE", "EXCELLENCE"]}
                morphTime={1.5}
                cooldownTime={0.5}
                className="font-bold"
                textClassName={isMobile ? "text-4xl text-neutral-900" : "text-4xl md:text-5xl lg:text-6xl text-neutral-900"}
              />
            </div>

            <div className={`text-neutral-700 ${isMobile ? "space-y-4" : "space-y-6"}`}>
              <p className={isMobile ? "text-base leading-relaxed" : "text-lg leading-relaxed"}>
                WelkomHome vous ouvre les portes des plus belles propriétés de la Côte d&apos;Azur. 
                Grâce à des années d&apos;expérience et une relation de confiance avec nos propriétaires, 
                nous vous proposons des villas d&apos;exception en exclusivité.
              </p>
              
              <p className={`leading-relaxed text-neutral-600 ${isMobile ? "text-sm" : "text-base"}`}>
                Que vous recherchiez une villa moderne à Saint-Tropez, une demeure élégante à Cannes 
                ou un refuge prestigieux à Monaco, notre sélection rigoureuse garantit des séjours 
                inoubliables dans un cadre d&apos;exception.
              </p>

              <div className={isMobile ? "pt-2" : "pt-4"}>
                <ul className={isMobile ? "space-y-1.5" : "space-y-3"}>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className={`text-blue-600 ${isMobile ? "mt-0.5 text-sm" : "mt-1"}`}>✓</span>
                    <span className={`text-neutral-700 ${isMobile ? "text-xs" : ""}`}>Sélection exclusive de propriétés d&apos;exception</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className={`text-blue-600 ${isMobile ? "mt-0.5 text-sm" : "mt-1"}`}>✓</span>
                    <span className={`text-neutral-700 ${isMobile ? "text-xs" : ""}`}>Service personnalisé et accompagnement sur-mesure</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className={`text-blue-600 ${isMobile ? "mt-0.5 text-sm" : "mt-1"}`}>✓</span>
                    <span className={`text-neutral-700 ${isMobile ? "text-xs" : ""}`}>Expertise locale et connaissance approfondie</span>
                  </li>
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={isMobile ? "pt-3" : "pt-6"}
              >
                <button
                  onClick={() => scrollToSection(4)}
                  className={`group relative inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-medium transition-all duration-300 hover:bg-blue-500 hover:scale-105 shadow-lg hover:shadow-xl ${isMobile ? "px-6 py-3 text-sm" : "px-8 py-4 text-base"}`}
                >
                  <span>Contactez-nous</span>
                  <svg 
                    className={`transition-transform group-hover:translate-x-1 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
