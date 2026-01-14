"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { FadeContent } from "@/components/ui/fade-content"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  MapPin, ArrowRight, ArrowLeft, Waves, Star, Camera, Utensils,
  Home, Sun, Umbrella, Wine, Music, Calendar, Clock, Euro,
  Phone, Globe, Instagram, Heart, Sparkles, Users, Car, Plane
} from "lucide-react"

// Rich destination data
const destinationData: Record<string, DestinationData> = {
  "saint-tropez": {
    name: "Saint-Tropez",
    tagline: "Le joyau de la Côte d'Azur",
    description: "Port légendaire, plages mythiques et vie nocturne effrénée. Saint-Tropez incarne le glamour de la Riviera.",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90",
    weather: { temp: "28°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "4 500 hab." },
      { icon: Car, label: "Depuis Nice", value: "1h30" },
      { icon: Plane, label: "Aéroport", value: "Toulon 50km" },
      { icon: Sun, label: "Jours de soleil", value: "300/an" },
    ],
    beaches: [
      {
        name: "Plage de Pampelonne",
        description: "5km de sable fin, clubs de plage légendaires",
        vibe: "Festif & Glamour",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: ["Nikki Beach", "Club 55", "Bagatelle"],
        priceRange: "€€€€"
      },
      {
        name: "Plage des Salins",
        description: "Plage familiale avec eaux cristallines",
        vibe: "Calme & Familial",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
        clubs: [],
        priceRange: "€"
      },
      {
        name: "Plage de la Moutte",
        description: "Crique secrète accessible à pied",
        vibe: "Sauvage & Préservé",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85",
        clubs: [],
        priceRange: "Gratuit"
      },
    ],
    restaurants: [
      {
        name: "Club 55",
        type: "Beach Club & Restaurant",
        cuisine: "Méditerranéenne",
        description: "Le club de plage le plus iconique depuis 1955",
        priceRange: "€€€€",
        mustTry: "Salade Tropézienne",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
        rating: 4.8,
        reservation: true
      },
      {
        name: "La Vague d'Or",
        type: "Gastronomique",
        cuisine: "Française contemporaine",
        description: "3 étoiles Michelin, Chef Arnaud Donckele",
        priceRange: "€€€€€",
        mustTry: "Menu dégustation",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
        rating: 4.9,
        reservation: true
      },
      {
        name: "Sénéquier",
        type: "Café & Brasserie",
        cuisine: "Française",
        description: "Institution tropézienne depuis 1887, terrasse sur le port",
        priceRange: "€€€",
        mustTry: "Tarte Tropézienne",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85",
        rating: 4.5,
        reservation: false
      },
      {
        name: "La Ponche",
        type: "Bistrot chic",
        cuisine: "Provençale",
        description: "Dans le vieux village, ambiance authentique",
        priceRange: "€€€",
        mustTry: "Bouillabaisse",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85",
        rating: 4.6,
        reservation: true
      },
    ],
    nightlife: [
      {
        name: "Les Caves du Roy",
        type: "Club légendaire",
        description: "Le club le plus exclusif de Saint-Tropez au Byblos",
        dress: "Très chic",
        hours: "23h - 5h",
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=85",
      },
      {
        name: "Nikki Beach",
        type: "Beach Club & Party",
        description: "Pool parties légendaires en journée",
        dress: "Beach chic",
        hours: "12h - 20h",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85",
      },
      {
        name: "VIP Room",
        type: "Club",
        description: "Scène internationale, DJ sets exclusifs",
        dress: "Élégant",
        hours: "0h - 6h",
        image: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=85",
      },
    ],
    activities: [
      { name: "Tour du port en yacht", duration: "2h", price: "À partir de 500€", icon: Waves },
      { name: "Visite de la Citadelle", duration: "1h30", price: "4€", icon: Camera },
      { name: "Marché Place des Lices", duration: "2h", price: "Gratuit", icon: Sparkles },
      { name: "Jet ski Pampelonne", duration: "30min", price: "80€", icon: Waves },
      { name: "Cours de voile", duration: "3h", price: "150€", icon: Sun },
      { name: "Dégustation de vins", duration: "2h", price: "60€", icon: Wine },
    ],
    events: [
      { name: "Les Voiles de Saint-Tropez", date: "Septembre", type: "Régate" },
      { name: "Bravade", date: "Mai", type: "Tradition" },
      { name: "Polo Cup", date: "Juillet", type: "Sport" },
    ],
    instagramSpots: [
      "Port de Saint-Tropez au coucher du soleil",
      "Place des Lices sous les platanes",
      "Vue depuis la Citadelle",
      "Pampelonne Beach Club",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
    ],
  },
  "cannes": {
    name: "Cannes",
    tagline: "La cité du cinéma",
    description: "Entre glamour du Festival, élégance de la Croisette et authenticité du Suquet.",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90",
    weather: { temp: "26°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "74 000 hab." },
      { icon: Car, label: "Depuis Nice", value: "30min" },
      { icon: Plane, label: "Aéroport", value: "Nice 25km" },
      { icon: Sun, label: "Jours de soleil", value: "310/an" },
    ],
    beaches: [
      {
        name: "Plages de la Croisette",
        description: "Plages privées le long du boulevard mythique",
        vibe: "Chic & Élégant",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: ["Carlton Beach", "Majestic Beach", "3.14 Beach"],
        priceRange: "€€€€"
      },
      {
        name: "Plage du Midi",
        description: "Grande plage publique face au vieux port",
        vibe: "Familial & Accessible",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
        clubs: [],
        priceRange: "Gratuit"
      },
      {
        name: "Îles de Lérins",
        description: "Criques paradisiaques à 15min en bateau",
        vibe: "Sauvage & Préservé",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85",
        clubs: [],
        priceRange: "€"
      },
    ],
    restaurants: [
      {
        name: "La Palme d'Or",
        type: "Gastronomique",
        cuisine: "Française",
        description: "2 étoiles Michelin au Martinez",
        priceRange: "€€€€€",
        mustTry: "Menu Festival",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
        rating: 4.9,
        reservation: true
      },
      {
        name: "Astoux et Brun",
        type: "Fruits de mer",
        cuisine: "Méditerranéenne",
        description: "Institution cannoise depuis 1953",
        priceRange: "€€€",
        mustTry: "Plateau royal",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85",
        rating: 4.7,
        reservation: true
      },
      {
        name: "Le Park 45",
        type: "Rooftop",
        cuisine: "Méditerranéenne moderne",
        description: "Vue panoramique sur la baie",
        priceRange: "€€€€",
        mustTry: "Risotto truffe",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
        rating: 4.6,
        reservation: true
      },
      {
        name: "Marché Forville",
        type: "Marché",
        cuisine: "Locale",
        description: "Produits frais et spécialités provençales",
        priceRange: "€€",
        mustTry: "Socca, Pissaladière",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85",
        rating: 4.8,
        reservation: false
      },
    ],
    nightlife: [
      {
        name: "Le Baôli",
        type: "Club & Restaurant",
        description: "Le hotspot de la jet-set cannoise",
        dress: "Très chic",
        hours: "20h - 4h",
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=85",
      },
      {
        name: "Gotha Club",
        type: "Club",
        description: "Club exclusif pendant le Festival",
        dress: "Élégant",
        hours: "23h - 5h",
        image: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=85",
      },
      {
        name: "Le 72 Croisette",
        type: "Bar lounge",
        description: "Cocktails avec vue sur la baie",
        dress: "Smart casual",
        hours: "18h - 2h",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85",
      },
    ],
    activities: [
      { name: "Montée des marches (tapis rouge)", duration: "1h", price: "Gratuit", icon: Star },
      { name: "Excursion Îles de Lérins", duration: "Demi-journée", price: "15€", icon: Waves },
      { name: "Visite du Suquet", duration: "2h", price: "Gratuit", icon: Camera },
      { name: "Shopping rue d'Antibes", duration: "3h", price: "Variable", icon: Sparkles },
      { name: "Cours de cuisine provençale", duration: "3h", price: "120€", icon: Utensils },
      { name: "Spa au Carlton", duration: "2h", price: "200€", icon: Sun },
    ],
    events: [
      { name: "Festival de Cannes", date: "Mai", type: "Cinéma" },
      { name: "MIPIM", date: "Mars", type: "Immobilier" },
      { name: "Festival d'Art Pyrotechnique", date: "Été", type: "Feux d'artifice" },
    ],
    instagramSpots: [
      "Marches du Palais des Festivals",
      "Carlton vue mer",
      "Vieux Port au crépuscule",
      "Panorama depuis Le Suquet",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
    ],
  },
  "ramatuelle": {
    name: "Ramatuelle",
    tagline: "Village médiéval perché",
    description: "Authenticité provençale et gardien des plages de Pampelonne.",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90",
    weather: { temp: "27°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "2 200 hab." },
      { icon: Car, label: "Depuis Saint-Tropez", value: "10min" },
      { icon: Plane, label: "Aéroport", value: "Toulon 55km" },
      { icon: Sun, label: "Jours de soleil", value: "300/an" },
    ],
    beaches: [
      {
        name: "Plage de l'Escalet",
        description: "Crique sauvage aux eaux turquoise",
        vibe: "Sauvage & Préservé",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: [],
        priceRange: "Gratuit"
      },
      {
        name: "Plage de Pampelonne Sud",
        description: "Partie plus calme de Pampelonne",
        vibe: "Détendu",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
        clubs: ["Tahiti Beach"],
        priceRange: "€€€"
      },
    ],
    restaurants: [
      {
        name: "Chez Camille",
        type: "Pieds dans l'eau",
        cuisine: "Poisson frais",
        description: "Institution de Pampelonne depuis 1955",
        priceRange: "€€€€",
        mustTry: "Loup grillé",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85",
        rating: 4.7,
        reservation: true
      },
      {
        name: "La Forge",
        type: "Village",
        cuisine: "Provençale",
        description: "Dans les ruelles du vieux village",
        priceRange: "€€€",
        mustTry: "Pieds paquets",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85",
        rating: 4.5,
        reservation: true
      },
    ],
    nightlife: [
      {
        name: "Moorea Plage",
        type: "Beach party",
        description: "Soirées sunset en été",
        dress: "Beach casual",
        hours: "18h - 23h",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85",
      },
    ],
    activities: [
      { name: "Sentier du littoral", duration: "3h", price: "Gratuit", icon: Camera },
      { name: "Visite du village", duration: "1h", price: "Gratuit", icon: Sparkles },
      { name: "Route des vins", duration: "4h", price: "80€", icon: Wine },
      { name: "Phare de Camarat", duration: "1h", price: "Gratuit", icon: Sun },
    ],
    events: [
      { name: "Festival de Ramatuelle", date: "Août", type: "Théâtre" },
      { name: "Fête de la Saint-André", date: "Novembre", type: "Tradition" },
    ],
    instagramSpots: [
      "Ruelles fleuries du village",
      "Vue depuis les moulins",
      "Plage de l'Escalet",
      "Coucher de soleil au phare",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
    ],
  },
  "grimaud": {
    name: "Grimaud",
    tagline: "La Venise Provençale",
    description: "Village médiéval et cité lacustre unique de Port-Grimaud.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90",
    weather: { temp: "27°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "4 300 hab." },
      { icon: Car, label: "Depuis Saint-Tropez", value: "15min" },
      { icon: Plane, label: "Aéroport", value: "Toulon 60km" },
      { icon: Sun, label: "Jours de soleil", value: "300/an" },
    ],
    beaches: [
      {
        name: "Plage de Port-Grimaud",
        description: "Plage familiale dans la cité lacustre",
        vibe: "Familial & Calme",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: [],
        priceRange: "€"
      },
    ],
    restaurants: [
      {
        name: "Le Suffren",
        type: "Bord de canal",
        cuisine: "Méditerranéenne",
        description: "Terrasse sur les canaux de Port-Grimaud",
        priceRange: "€€€",
        mustTry: "Bouillabaisse",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85",
        rating: 4.4,
        reservation: true
      },
      {
        name: "Les Santons",
        type: "Gastronomique",
        cuisine: "Provençale raffinée",
        description: "Dans le village médiéval",
        priceRange: "€€€€",
        mustTry: "Agneau de Sisteron",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
        rating: 4.6,
        reservation: true
      },
    ],
    nightlife: [],
    activities: [
      { name: "Balade en bateau électrique", duration: "1h", price: "25€", icon: Waves },
      { name: "Château de Grimaud", duration: "1h30", price: "Gratuit", icon: Camera },
      { name: "Marché provençal", duration: "2h", price: "Gratuit", icon: Sparkles },
      { name: "Domaines viticoles", duration: "3h", price: "40€", icon: Wine },
    ],
    events: [
      { name: "Fête de la Saint-Michel", date: "Septembre", type: "Tradition" },
      { name: "Grimaldines", date: "Juillet", type: "Musique" },
    ],
    instagramSpots: [
      "Canaux de Port-Grimaud",
      "Vue du château féodal",
      "Église Saint-Michel",
      "Pont des Fées",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
    ],
  },
  "sainte-maxime": {
    name: "Sainte-Maxime",
    tagline: "Élégance familiale",
    description: "Station balnéaire chic face au golfe de Saint-Tropez.",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90",
    weather: { temp: "27°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "14 000 hab." },
      { icon: Car, label: "Depuis Saint-Tropez", value: "Ferry 20min" },
      { icon: Plane, label: "Aéroport", value: "Toulon 55km" },
      { icon: Sun, label: "Jours de soleil", value: "300/an" },
    ],
    beaches: [
      {
        name: "Plage de la Nartelle",
        description: "Grande plage de sable fin",
        vibe: "Familial",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: ["La Plage"],
        priceRange: "€€"
      },
      {
        name: "Plage du Centre",
        description: "Face au port, animée",
        vibe: "Animé",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
        clubs: [],
        priceRange: "Gratuit"
      },
    ],
    restaurants: [
      {
        name: "La Badiane",
        type: "Gastronomique",
        cuisine: "Créative",
        description: "Chef étoilé Geoffrey Poësson",
        priceRange: "€€€€",
        mustTry: "Menu surprise",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
        rating: 4.8,
        reservation: true
      },
      {
        name: "Le Sarment de Vigne",
        type: "Bistrot",
        cuisine: "Provençale",
        description: "Cave à vins et tapas",
        priceRange: "€€",
        mustTry: "Planche du vigneron",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85",
        rating: 4.5,
        reservation: false
      },
    ],
    nightlife: [
      {
        name: "Le Carré Noir",
        type: "Bar musical",
        description: "Concerts live en été",
        dress: "Casual",
        hours: "19h - 2h",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85",
      },
    ],
    activities: [
      { name: "Ferry vers Saint-Tropez", duration: "20min", price: "8€", icon: Waves },
      { name: "Golf de Beauvallon", duration: "4h", price: "100€", icon: Sun },
      { name: "Marché couvert", duration: "1h", price: "Gratuit", icon: Sparkles },
      { name: "Kayak de mer", duration: "2h", price: "35€", icon: Waves },
    ],
    events: [
      { name: "Fête de la Mer", date: "Août", type: "Tradition" },
      { name: "Jazz Festival", date: "Juillet", type: "Musique" },
    ],
    instagramSpots: [
      "Promenade Simon Lorière",
      "Port de plaisance sunset",
      "Vue sur Saint-Tropez",
      "Marché aux fleurs",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
    ],
  },
  "cap-d-antibes": {
    name: "Cap d'Antibes",
    tagline: "Presqu'île de rêve",
    description: "Refuge légendaire de l'aristocratie et des artistes.",
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=90",
    weather: { temp: "26°C", condition: "Ensoleillé" },
    quickFacts: [
      { icon: Users, label: "Population", value: "8 000 hab." },
      { icon: Car, label: "Depuis Nice", value: "25min" },
      { icon: Plane, label: "Aéroport", value: "Nice 15km" },
      { icon: Sun, label: "Jours de soleil", value: "310/an" },
    ],
    beaches: [
      {
        name: "Plage de la Garoupe",
        description: "Crique mythique aux eaux turquoise",
        vibe: "Exclusif",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",
        clubs: ["Joseph"],
        priceRange: "€€€€"
      },
      {
        name: "Plage de la Salis",
        description: "Vue sur la vieille ville d'Antibes",
        vibe: "Familial",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
        clubs: [],
        priceRange: "Gratuit"
      },
    ],
    restaurants: [
      {
        name: "Eden-Roc Restaurant",
        type: "Gastronomique",
        cuisine: "Méditerranéenne",
        description: "Au mythique Hôtel du Cap",
        priceRange: "€€€€€",
        mustTry: "Bouillabaisse Eden-Roc",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
        rating: 4.9,
        reservation: true
      },
      {
        name: "Le Cap",
        type: "Pool restaurant",
        cuisine: "Légère et raffinée",
        description: "Déjeuner au bord de la piscine iconique",
        priceRange: "€€€€",
        mustTry: "Salade César",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
        rating: 4.7,
        reservation: true
      },
      {
        name: "Bacon",
        type: "Fruits de mer",
        cuisine: "Bouillabaisse",
        description: "La meilleure bouillabaisse de la côte",
        priceRange: "€€€€",
        mustTry: "Bouillabaisse royale",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85",
        rating: 4.8,
        reservation: true
      },
    ],
    nightlife: [],
    activities: [
      { name: "Sentier de Tire-Poil", duration: "2h30", price: "Gratuit", icon: Camera },
      { name: "Villa Eilenroc & jardins", duration: "2h", price: "6€", icon: Sparkles },
      { name: "Kayak tour du Cap", duration: "3h", price: "60€", icon: Waves },
      { name: "Plongée aux épaves", duration: "3h", price: "80€", icon: Waves },
    ],
    events: [
      { name: "Gala de l'amfAR", date: "Mai", type: "Caritatif" },
      { name: "Festival Jazz à Juan", date: "Juillet", type: "Musique" },
    ],
    instagramSpots: [
      "Piscine du Cap-Eden-Roc",
      "Sentier du littoral",
      "Phare de la Garoupe",
      "Villa Eilenroc",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
    ],
  },
}

// Types
interface DestinationData {
  name: string
  tagline: string
  description: string
  heroImage: string
  weather: { temp: string; condition: string }
  quickFacts: { icon: React.ElementType; label: string; value: string }[]
  beaches: {
    name: string
    description: string
    vibe: string
    image: string
    clubs: string[]
    priceRange: string
  }[]
  restaurants: {
    name: string
    type: string
    cuisine: string
    description: string
    priceRange: string
    mustTry: string
    image: string
    rating: number
    reservation: boolean
  }[]
  nightlife: {
    name: string
    type: string
    description: string
    dress: string
    hours: string
    image: string
  }[]
  activities: { name: string; duration: string; price: string; icon: React.ElementType }[]
  events: { name: string; date: string; type: string }[]
  instagramSpots: string[]
  gallery: string[]
}

// Default data
const defaultData: DestinationData = {
  name: "Destination",
  tagline: "Côte d'Azur",
  description: "Une destination magnifique sur la Riviera française.",
  heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90",
  weather: { temp: "26°C", condition: "Ensoleillé" },
  quickFacts: [
    { icon: Users, label: "Atmosphère", value: "Authentique" },
    { icon: Sun, label: "Climat", value: "Méditerranéen" },
  ],
  beaches: [],
  restaurants: [],
  nightlife: [],
  activities: [],
  events: [],
  instagramSpots: [],
  gallery: [],
}

// Tab component
type TabType = "overview" | "beaches" | "restaurants" | "nightlife" | "activities"

export default function DestinationPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const data = destinationData[slug] || {
    ...defaultData,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
  }

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Aperçu", icon: Sparkles },
    { id: "beaches", label: "Plages", icon: Umbrella },
    { id: "restaurants", label: "Restaurants", icon: Utensils },
    { id: "nightlife", label: "Vie nocturne", icon: Music },
    { id: "activities", label: "Activités", icon: Camera },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentSection={-1} isAtTop={false} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={data.heroImage}
              alt={data.name}
              fill
              className="object-cover"
              priority
              quality={95}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </div>

          {/* Back button */}
          <Link
            href="/destinations"
            className="absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Retour</span>
          </Link>

          {/* Weather badge */}
          <div className="absolute top-24 right-4 sm:right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <Sun className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">{data.weather.temp}</span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-8 sm:pb-12">
            <FadeContent>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm font-medium uppercase tracking-widest">
                  {data.tagline}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-3">
                {data.name}
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-xl font-light mb-6">
                {data.description}
              </p>

              {/* Quick facts */}
              <div className="flex flex-wrap gap-4">
                {data.quickFacts.map((fact, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <fact.icon className="w-4 h-4 text-white/70" />
                    <span className="text-xs sm:text-sm text-white/90">{fact.value}</span>
                  </div>
                ))}
              </div>
            </FadeContent>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-16 z-30 bg-white border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="py-12 sm:py-16">
                {/* Instagram Spots */}
                {data.instagramSpots.length > 0 && (
                  <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <h2 className="text-xl font-semibold text-neutral-900">Spots Instagram</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.instagramSpots.map((spot, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-sm text-neutral-700 border border-pink-100"
                        >
                          📍 {spot}
                        </motion.span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Gallery */}
                <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">Galerie</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {data.gallery.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative rounded-2xl overflow-hidden ${
                          i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image src={img} alt="" fill className="object-cover" quality={85} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Events */}
                {data.events.length > 0 && (
                  <section className="max-w-6xl mx-auto px-4 sm:px-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <h2 className="text-xl font-semibold text-neutral-900">Événements</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {data.events.map((event, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                        >
                          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{event.type}</span>
                          <h3 className="text-lg font-semibold text-neutral-900 mt-1">{event.name}</h3>
                          <p className="text-sm text-neutral-500 mt-1">{event.date}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Beaches Tab */}
            {activeTab === "beaches" && (
              <div className="py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                  <div className="grid gap-6">
                    {data.beaches.map((beach, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group grid md:grid-cols-2 gap-6 p-6 rounded-3xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100/50"
                      >
                        <div className="relative h-48 md:h-full min-h-[200px] rounded-2xl overflow-hidden">
                          <Image src={beach.image} alt={beach.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" quality={85} />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-cyan-700">
                            {beach.vibe}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{beach.name}</h3>
                          <p className="text-neutral-600 mb-4">{beach.description}</p>

                          <div className="flex items-center gap-2 mb-4">
                            <Euro className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-600">{beach.priceRange}</span>
                          </div>

                          {beach.clubs.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Beach clubs</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {beach.clubs.map((club, j) => (
                                  <span key={j} className="px-3 py-1 rounded-full bg-white text-sm text-neutral-700 border border-neutral-200">
                                    {club}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {data.beaches.length === 0 && (
                    <div className="text-center py-16 text-neutral-500">
                      <Umbrella className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Informations sur les plages à venir</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Restaurants Tab */}
            {activeTab === "restaurants" && (
              <div className="py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {data.restaurants.map((resto, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group rounded-3xl bg-white border border-neutral-100 overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image src={resto.image} alt={resto.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" quality={85} />
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-medium">{resto.rating}</span>
                          </div>
                          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-medium text-white">
                            {resto.type}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-neutral-900">{resto.name}</h3>
                            <span className="text-sm text-amber-600 font-medium">{resto.priceRange}</span>
                          </div>
                          <p className="text-sm text-neutral-500 mb-3">{resto.cuisine}</p>
                          <p className="text-sm text-neutral-600 mb-4">{resto.description}</p>

                          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                            <div className="flex items-center gap-2">
                              <Utensils className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-neutral-700">À essayer: <strong>{resto.mustTry}</strong></span>
                            </div>
                            {resto.reservation && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">Résa recommandée</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {data.restaurants.length === 0 && (
                    <div className="text-center py-16 text-neutral-500">
                      <Utensils className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Informations sur les restaurants à venir</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nightlife Tab */}
            {activeTab === "nightlife" && (
              <div className="py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                  {data.nightlife.length > 0 ? (
                    <div className="grid sm:grid-cols-3 gap-6">
                      {data.nightlife.map((venue, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group relative rounded-3xl overflow-hidden"
                        >
                          <div className="relative h-80">
                            <Image src={venue.image} alt={venue.name} fill className="object-cover" quality={85} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">{venue.type}</span>
                            <h3 className="text-xl font-semibold text-white mt-1 mb-2">{venue.name}</h3>
                            <p className="text-sm text-white/70 mb-4">{venue.description}</p>
                            <div className="flex items-center gap-4 text-white/60 text-xs">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {venue.hours}
                              </span>
                              <span>Dress: {venue.dress}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                        <Music className="w-8 h-8 text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-700 mb-2">Ambiance paisible</h3>
                      <p className="text-neutral-500">{data.name} privilégie le calme et la sérénité.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === "activities" && (
              <div className="py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.activities.map((activity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group p-5 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0 group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                            <activity.icon className="w-5 h-5 text-amber-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 mb-1">{activity.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.duration}
                              </span>
                              <span className="text-amber-600 font-medium">{activity.price}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {data.activities.length === 0 && (
                    <div className="text-center py-16 text-neutral-500">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Activités à venir</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-8 bg-neutral-50">
          <div className="max-w-4xl mx-auto text-center">
            <FadeContent>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-4">
                Séjournez à <span className="italic font-normal">{data.name}</span>
              </h2>
              <p className="text-neutral-500 mb-8">
                Découvrez nos villas d'exception dans cette destination
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/hosting"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Voir nos logements</span>
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Nous contacter</span>
                </Link>
              </div>
            </FadeContent>
          </div>
        </section>
      </main>
    </div>
  )
}
