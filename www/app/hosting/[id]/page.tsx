import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Users, BedDouble, Bath, Home, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingDetailClient } from "@/components/listing-detail-client";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";

const allListings: Listing[] = (listingsData as Omit<Listing, "id">[]).map(
  (l, i) => ({ ...l, id: i + 1, images: [], houseRules: null })
);

export function generateStaticParams() {
  return allListings.map((l) => ({ id: String(l.id) }));
}

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listingId = parseInt(id);

  if (isNaN(listingId)) {
    notFound();
  }

  const currentListing = allListings.find((l) => l.id === listingId);

  if (!currentListing) {
    notFound();
  }

  const images = currentListing.images as string[] || [];
  const amenities = currentListing.amenities as string[] || [];
  const houseRules = currentListing.houseRules as any || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <ListingDetailClient />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          {currentListing.coverImage && (
            <div className="col-span-4 md:col-span-2 md:row-span-2 relative aspect-video md:aspect-square">
              <Image
                src={currentListing.coverImage}
                alt={currentListing.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative aspect-square">
              <Image
                src={img}
                alt={`${currentListing.title} - Photo ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Location */}
            <div className="border-b border-border/50 pb-8">
              {currentListing.featured && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] uppercase tracking-widest font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Exclusivité
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-playfair font-light mb-4 text-foreground leading-tight">
                {currentListing.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest">
                <MapPin className="h-4 w-4" />
                <span>{currentListing.location}</span>
                {currentListing.city && <span>• {currentListing.city}</span>}
                {currentListing.country && <span>• {currentListing.country}</span>}
              </div>
            </div>

            {/* Features */}
            <div className="py-2">
              <div className="flex flex-wrap gap-8 md:gap-12">
                <div className="flex items-center gap-3">
                  <div className="p-0">
                    <Users className="h-5 w-5 text-primary/70 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Voyageurs</div>
                    <div className="font-playfair text-xl">{currentListing.maxGuests}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-0">
                    <BedDouble className="h-5 w-5 text-primary/70 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Chambres</div>
                    <div className="font-playfair text-xl">{currentListing.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-0">
                    <Bath className="h-5 w-5 text-primary/70 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Salles de bain</div>
                    <div className="font-playfair text-xl">{currentListing.bathrooms}</div>
                  </div>
                </div>
                {currentListing.surface && (
                  <div className="flex items-center gap-3">
                    <div className="p-0">
                      <Home className="h-5 w-5 text-primary/70 stroke-[1.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Surface</div>
                      <div className="font-playfair text-xl">{currentListing.surface}m²</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="pt-6">
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-primary mb-6">À propos de cette propriété</h2>
              <p className="text-muted-foreground/90 leading-relaxed whitespace-pre-line instrument font-light text-[15px]">
                {currentListing.description}
              </p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="pt-6 border-t border-border/50">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-primary mb-6">Équipements & Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="text-xl opacity-80">{getAmenityIcon(amenity)}</div>
                      <span className="text-sm font-light capitalize">
                        {amenity.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            <div className="pt-6 border-t border-border/50">
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-primary mb-6">Conditions & Règles</h2>
              <div className="bg-primary/5 p-8 border border-primary/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                    <span className="text-sm font-light text-muted-foreground">Animaux</span>
                    <span className={`text-sm ${houseRules.pets ? "text-primary" : "text-muted-foreground/50"}`}>
                      {houseRules.pets ? "Autorisés" : "Non autorisés"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                    <span className="text-sm font-light text-muted-foreground">Fumeur</span>
                    <span className={`text-sm ${houseRules.smoking ? "text-primary" : "text-muted-foreground/50"}`}>
                      {houseRules.smoking ? "Autorisé" : "Non autorisé"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                    <span className="text-sm font-light text-muted-foreground">Événements</span>
                    <span className={`text-sm ${houseRules.parties ? "text-primary" : "text-muted-foreground/50"}`}>
                      {houseRules.parties ? "Sur demande" : "Non autorisés"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                    <span className="text-sm font-light text-muted-foreground">Check-in / Check-out</span>
                    <span className="text-sm text-foreground">
                      {houseRules.checkIn || "15:00"} — {houseRules.checkOut || "11:00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            {(currentListing.latitude && currentListing.longitude) && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Localisation</h2>
                <Card className="p-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Carte interactive à venir</p>
                      <p className="text-sm mt-1">
                        {currentListing.latitude}, {currentListing.longitude}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-border/50 bg-background p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              <div className="space-y-8">
                <div className="text-center pb-6 border-b border-border/50">
                  <div className="font-playfair text-3xl mb-2 text-foreground">
                    Sur mesure
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Tarification & Disponibilités
                  </p>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors">
                  Demande de réservation
                </button>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-light">Disponibilité</span>
                    <span className="font-medium text-primary flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-green-500/80"></span> Sur demande
                    </span>
                  </div>
                  {currentListing.viewCount != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-light">Intérêt</span>
                      <span className="font-medium">{currentListing.viewCount} vues récentes</span>
                    </div>
                  )}
                  {currentListing.createdAt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-light">Référence</span>
                      <span className="font-medium uppercase text-xs">WH-{currentListing.id.toString().padStart(4, '0')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-border/50">
                  <button className="w-full flex items-center justify-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors py-2 border border-transparent hover:border-primary/20">
                    <Heart className="h-4 w-4" />
                    <span className="tracking-widest uppercase text-[10px]">Sauvegarder</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAmenityIcon(amenity: string): string {
  const icons: Record<string, string> = {
    wifi: "📶",
    pool: "🏊",
    air_conditioning: "❄️",
    kitchen: "🍳",
    parking: "🅿️",
    sea_view: "🌊",
    jacuzzi: "🛁",
    gym: "💪",
    garden: "🌳",
    tv: "📺",
    washing_machine: "🧺",
    fireplace: "🔥",
    balcony: "🏡",
    terrace: "☀️",
  };
  return icons[amenity] || "✓";
}
