"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FadeContent } from "@/components/ui/fade-content"

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const translateTitle = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="min-h-screen w-full shrink-0 flex flex-col justify-center bg-background py-20 relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-20 relative z-10 flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
        <FadeContent className="max-w-3xl">
          <span className="uppercase text-[9px] sm:text-[10px] tracking-[0.4em] text-[#E6D5B8] font-medium mb-6 block border-l border-[#E6D5B8] pl-4">
            Portfolio Privé
          </span>
          <motion.h2 
            style={{ y: translateTitle }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair text-foreground font-light leading-[1.1] tracking-tight"
          >
            Propriétés <br className="hidden md:block" />
            <span className="font-mea-culpa italic text-6xl sm:text-8xl md:text-[8rem] text-[#E6D5B8] relative pr-6 leading-[0.8] mt-2 block md:inline-block">d'exception</span>
          </motion.h2>
        </FadeContent>
        
        <FadeContent delay={0.2} className="pb-4 shrink-0">
          <Link href="/hosting" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
            Voir la collection
            <span className="w-12 h-[1px] bg-muted-foreground/30 group-hover:w-20 group-hover:bg-foreground transition-all duration-500"></span>
          </Link>
        </FadeContent>
      </div>

      <div className="w-full relative z-10">
        <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-muted-foreground/10" />
        
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 md:gap-16 px-6 sm:px-12 md:px-20 py-16 items-start"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar {
              display: none;
            }
          `}} />

          {villaData.map((villa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="shrink-0 snap-center group w-[85vw] sm:w-[500px] md:w-[600px] flex flex-col"
            >
              <Link href={`/destinations/${villa.city.toLowerCase().replace(/[' ]/g, "-")}`} className="block w-full">
                {/* Cadre image de luxe (Aspect ratio 3/4) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-8 bg-muted/20">
                  <Image
                    src={villa.src}
                    alt={villa.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 600px"
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000" />
                </div>
                
                {/* Typographie de la carte */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-playfair text-3xl sm:text-4xl text-foreground font-light mb-3 group-hover:text-[#E6D5B8] transition-colors duration-700">
                      {villa.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                      <span className="w-6 h-[0.5px] bg-muted-foreground/50 transition-colors group-hover:bg-[#E6D5B8]"></span>
                      {villa.city}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-6 group-hover:translate-x-0 hidden md:block mt-2">
                    <svg className="w-6 h-6 text-[#E6D5B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="shrink-0 w-12 md:w-24 h-full" />
        </div>
      </div>
    </section>
  )
}

const villaData = [
  {
    title: "Villa Tumulus",
    city: "Saint-Tropez",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90",
  },
  {
    title: "Villa Les Tourterelles",
    city: "Ramatuelle",
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90",
  },
  {
    title: "Villa Méditerranée",
    city: "Cannes",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=90",
  },
  {
    title: "Villa Prestige",
    city: "Sainte-Maxime",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90",
  },
  {
    title: "Villa Azure",
    city: "Grimaud",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
  },
  {
    title: "Villa Riviera",
    city: "Cap d'Antibes",
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&q=90",
  },
]
