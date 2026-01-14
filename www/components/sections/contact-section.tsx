"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useBreakpoint } from "@/hooks/use-media-query"

interface ContactSectionProps {
  isMobile?: boolean
}

export function ContactSection({ isMobile: propIsMobile = false }: ContactSectionProps) {
  const { isMobile, isTablet } = useBreakpoint()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex flex-col md:flex-row">
      {/* Left Column - Content & Form */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col justify-center px-6 py-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md mx-auto md:mx-0 w-full"
        >
          {/* Header */}
          <div className="mb-5 md:mb-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 mb-2 block">
              Contact
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight leading-[1.1] mb-2">
              Parlons de votre <br />
              <span className="italic font-normal">prochain séjour</span>
            </h2>
            <p className="text-neutral-600 text-xs font-light leading-relaxed max-w-xs">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <div className="group">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors duration-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors duration-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="group">
              <textarea
                placeholder="Votre message"
                rows={1}
                className="w-full bg-transparent border-b border-neutral-200 py-2 text-sm font-light placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors duration-300 resize-none min-h-10"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="group flex items-center gap-3 text-[10px] font-medium tracking-wide uppercase hover:opacity-70 transition-opacity pt-2"
            >
              <span>Envoyer</span>
              <span className="block w-6 h-px bg-black group-hover:w-8 transition-all duration-300" />
            </button>
          </form>

          {/* Footer Info */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div>
              <h3 className="text-[10px] font-medium tracking-wider uppercase text-neutral-500 mb-1">Email</h3>
              <a href="mailto:contact@welkomhome.com" className="text-xs hover:underline decoration-neutral-300 underline-offset-4">
                contact@welkomhome.com
              </a>
            </div>
            <div>
              <h3 className="text-[10px] font-medium tracking-wider uppercase text-neutral-500 mb-1">Social</h3>
              <div className="flex flex-col gap-1">
                <a href="https://instagram.com/welkomhome" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline decoration-neutral-300 underline-offset-4 w-fit">
                  Instagram
                </a>
                <a href="https://facebook.com/welkomhome" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline decoration-neutral-300 underline-offset-4 w-fit">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block w-[45%] lg:w-[40%] h-screen sticky top-0">
        <div className="absolute inset-0 bg-neutral-100">
          <Image
            src="/baraque.png"
            alt="Luxury Villa"
            fill
            sizes="(max-width: 1024px) 50vw, 50vw"
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  )
}
