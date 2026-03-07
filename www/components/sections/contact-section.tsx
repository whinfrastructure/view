"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Send, MapPin, Mail, Phone } from "lucide-react"

interface ContactSectionProps {
  isMobile?: boolean
}

export function ContactSection({ isMobile = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section className="h-screen w-full shrink-0 relative overflow-hidden flex items-center justify-center bg-[#111]">
      {/* Background with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/baraque.png"
          alt="Luxury Villa Night"
          fill
          className="object-cover opacity-60 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-24">
        
        {/* Left: Text & Info */}
        <div className="w-full md:w-5/12 text-white pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-[10px] tracking-[0.2em] uppercase text-white/80 mb-6 bg-white/5 backdrop-blur-sm">
              Contact Privé
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light leading-tight mb-6">
              Créons votre <br />
              <span className="text-[#E6D5B8] italic font-mea-culpa pr-4">expérience</span>
              unique
            </h2>
            <p className="text-white/60 font-light leading-relaxed max-w-md mb-12">
              Que ce soit pour une réservation, une demande particulière ou simplement pour échanger sur votre projet, notre équipe de conciergerie est à votre écoute.
            </p>

            <div className="space-y-6 hidden md:block">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E6D5B8] group-hover:bg-[#E6D5B8]/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-white/80 group-hover:text-[#E6D5B8]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Email</p>
                  <p className="font-playfair text-lg">contact@welkomhome.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E6D5B8] group-hover:bg-[#E6D5B8]/10 transition-all duration-300">
                  <Phone className="w-5 h-5 text-white/80 group-hover:text-[#E6D5B8]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Téléphone</p>
                  <p className="font-playfair text-lg">+33 4 94 00 00 00</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E6D5B8] group-hover:bg-[#E6D5B8]/10 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-white/80 group-hover:text-[#E6D5B8]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Bureau</p>
                  <p className="font-playfair text-lg">Saint-Tropez, France</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Glass Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-5/12 lg:w-4/12 relative"
        >
          <div className="absolute inset-0 bg-[#E6D5B8] blur-[100px] opacity-10 rounded-full pointer-events-none" />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/40 ml-1">Nom</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E6D5B8]/50 focus:bg-white/10 transition-all"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-white/40 ml-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E6D5B8]/50 focus:bg-white/10 transition-all"
                    placeholder="06..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/40 ml-1">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E6D5B8]/50 focus:bg-white/10 transition-all"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/40 ml-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E6D5B8]/50 focus:bg-white/10 transition-all resize-none"
                  placeholder="Parlez-nous de votre projet..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E6D5B8] text-black font-medium tracking-wide uppercase text-xs py-4 rounded-lg hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 mt-4 group"
              >
                <span>Envoyer la demande</span>
                <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
            
            <p className="text-white/20 text-[10px] text-center mt-6 font-light">
              Nous répondons généralement sous 24 heures.
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  )
}