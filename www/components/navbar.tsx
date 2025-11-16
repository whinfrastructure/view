"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface NavbarProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isLoaded: boolean
}

interface DropdownItem {
  label: string
  description?: string
  icon?: string
  onClick: () => void
}

interface NavItem {
  label: string
  index: number
  dropdown?: DropdownItem[]
}

export function Navbar({ currentSection, scrollToSection, isLoaded }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const router = useRouter()

  const isDarkMode = currentSection === 0

  const navItems: NavItem[] = [
    {
      label: "Accueil",
      index: 0,
    },
    {
      label: "Logements",
      index: 1,
      dropdown: [
        {
          label: "Tous les logements",
          description: "Découvrez notre collection complète",
          icon: "🏠",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Villas de luxe",
          description: "Propriétés haut de gamme",
          icon: "✨",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Vues sur mer",
          description: "Panoramas exceptionnels",
          icon: "🌊",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Avec piscine",
          description: "Espaces aquatiques privés",
          icon: "🏊",
          onClick: () => scrollToSection(1),
        },
      ],
    },
    {
      label: "Avis",
      index: 2,
    },
    {
      label: "À Propos",
      index: 3,
    },
    {
      label: "Contact",
      index: 4,
    },
    {
      label: "Services",
      index: -1,
      dropdown: [
        {
          label: "Conciergerie",
          description: "Service personnalisé 24/7",
          icon: "🔑",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Chef à domicile",
          description: "Gastronomie raffinée",
          icon: "👨‍🍳",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Transferts VIP",
          description: "Transport premium",
          icon: "🚗",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Événements privés",
          description: "Organisation sur-mesure",
          icon: "🎉",
          onClick: () => scrollToSection(3),
        },
      ],
    },
    {
      label: "Destinations",
      index: -1,
      dropdown: [
        {
          label: "Saint-Tropez",
          description: "Élégance et glamour",
          icon: "⛵",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Les Issambres",
          description: "Tranquillité et authenticité",
          icon: "🏖️",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Sainte-Maxime",
          description: "Charme familial",
          icon: "🌊",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Grimaud",
          description: "Village médiéval",
          icon: "🏰",
          onClick: () => scrollToSection(1),
        },
      ],
    },
  ]

  const handleMouseEnter = (label: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
      setActiveDropdown(label)
    }
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-700 md:px-8 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${isDarkMode ? "text-white" : "text-black bg-white/80 backdrop-blur-md shadow-sm"}`}
    >
      {/* Logo */}
      <button
        onClick={() => scrollToSection(0)}
        className="flex items-center gap-2 transition-transform hover:scale-105"
      >
        <svg 
          className={`h-8 w-8 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
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
          isDarkMode ? "text-white" : "text-black"
        }`}>WelkomHome</span>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label, !!item.dropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => item.index >= 0 && scrollToSection(item.index)}
              className={`group relative flex items-center gap-1 font-sans text-xs font-medium transition-colors ${
                currentSection === item.index 
                  ? (isDarkMode ? "text-white" : "text-black")
                  : (isDarkMode ? "text-white/80 hover:text-white" : "text-black/60 hover:text-black")
              }`}
            >
              {item.label}
              {item.dropdown && (
                <svg 
                  className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span
                className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  isDarkMode ? "bg-white" : "bg-black"
                } ${currentSection === item.index ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {item.dropdown && activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full pt-2 min-w-[280px]"
                >
                  <div className="rounded-xl bg-white shadow-xl border border-neutral-200 overflow-hidden">
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            dropdownItem.onClick()
                            setActiveDropdown(null)
                          }}
                          className="w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-neutral-50 group"
                        >
                          {dropdownItem.icon && (
                            <span className="text-2xl mt-0.5 transition-transform group-hover:scale-110">
                              {dropdownItem.icon}
                            </span>
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-sm text-neutral-900 mb-0.5">
                              {dropdownItem.label}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-xs text-neutral-500">
                                {dropdownItem.description}
                              </div>
                            )}
                          </div>
                          <svg 
                            className="w-4 h-4 text-neutral-400 mt-1 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* CTA Button */}
      <button
        onClick={() => router.push('/auth/register')}
        className={`rounded-full backdrop-blur-md px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
          isDarkMode 
            ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" 
            : "bg-black text-white hover:bg-black/80"
        }`}
      >
        Réserver
      </button>
    </nav>
  )
}
