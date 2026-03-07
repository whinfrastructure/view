"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FadeContent } from "@/components/ui/fade-content"

export function CollectionStrip() {
  const showcaseVillas = villaData.slice(0, 3)

  return (
    <section className="h-screen w-full shrink-0 flex items-center justify-center bg-background relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between h-full py-4">
        
        {/* Left Side: Text Content - Decoupled from images */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left z-20 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-4 inline-block"
          >
            <span className="uppercase text-[10px] tracking-[0.4em] text-[#E6D5B8] font-medium border-b border-[#E6D5B8]/30 pb-2">
              Portfolio Privé
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair text-foreground font-light leading-[0.9] tracking-tight mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block mb-2"
            >
              Collection
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-mea-culpa italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E6D5B8] leading-[0.8] block ml-4 md:ml-12" 
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.05)"}}
            >
              d'exception
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden md:block max-w-sm text-muted-foreground font-light leading-relaxed mb-8"
          >
            <p>Une sélection rigoureuse de propriétés où le luxe rencontre l'authenticité. Chaque villa raconte une histoire unique sur la Côte d'Azur.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="/hosting" className="group relative px-6 py-3 bg-transparent border-[0.5px] border-[#E6D5B8]/50 hover:bg-[#E6D5B8]/10 text-foreground font-playfair italic tracking-wide transition-all duration-500 overflow-hidden inline-flex items-center gap-3">
              <span className="relative z-10">Découvrir le portfolio</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-[#E6D5B8]">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Images Grid - Chic Layout */}
        <div className="w-full md:w-[55%] h-[50vh] md:h-[65vh] relative flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Main Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-[3/4] z-20"
            >
               <Link href={`/destinations/${showcaseVillas[1].city.toLowerCase().replace(/[' ]/g, "-")}`} className="block w-full h-full relative group overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src={showcaseVillas[1].src}
                  alt={showcaseVillas[1].title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-playfair text-xl italic">{showcaseVillas[1].title}</p>
                </div>
              </Link>
            </motion.div>

            {/* Top Right Image (Floating) */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute right-[5%] top-[5%] w-[30%] aspect-square z-10"
            >
              <Link href={`/destinations/${showcaseVillas[0].city.toLowerCase().replace(/[' ]/g, "-")}`} className="block w-full h-full relative group overflow-hidden border border-white/20 shadow-xl">
                <Image
                  src={showcaseVillas[0].src}
                  alt={showcaseVillas[0].title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-playfair text-sm italic">{showcaseVillas[0].city}</p>
                </div>
              </Link>
            </motion.div>

            {/* Bottom Left Image (Floating) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-[5%] bottom-[5%] w-[30%] aspect-square z-30"
            >
              <Link href={`/destinations/${showcaseVillas[2].city.toLowerCase().replace(/[' ]/g, "-")}`} className="block w-full h-full relative group overflow-hidden border border-white/20 shadow-xl">
                <Image
                  src={showcaseVillas[2].src}
                  alt={showcaseVillas[2].title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-playfair text-sm italic">{showcaseVillas[2].city}</p>
                </div>
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E6D5B8]/20 -z-10 origin-left"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute left-1/2 top-0 w-[1px] h-full bg-[#E6D5B8]/20 -z-10 origin-top"
            />
          </div>
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
