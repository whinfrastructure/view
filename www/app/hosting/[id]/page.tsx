import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Users, BedDouble, Bath, Home, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingDetailClient } from "@/components/listing-detail-client";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listingId = parseInt(id);

  if (isNaN(listingId)) {
    notFound();
  }

  const listing = await db
    .select()
    .from(listings)
    .where(eq(listings.id, listingId))
    .limit(1);

  if (!listing || listing.length === 0) {
    notFound();
  }

  const currentListing = listing[0];
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
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              {currentListing.featured && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  <span className="text-xs">⭐</span>
                  Coup de coeur
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {currentListing.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{currentListing.location}</span>
                {currentListing.city && <span>• {currentListing.city}</span>}
                {currentListing.country && <span>• {currentListing.country}</span>}
              </div>
            </div>

            {/* Features */}
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Voyageurs</div>
                    <div className="font-semibold">{currentListing.maxGuests}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BedDouble className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Chambres</div>
                    <div className="font-semibold">{currentListing.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Bath className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Salles de bain</div>
                    <div className="font-semibold">{currentListing.bathrooms}</div>
                  </div>
                </div>
                {currentListing.surface && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Surface</div>
                      <div className="font-semibold">{currentListing.surface}m²</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {currentListing.description}
              </p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 rounded-lg border bg-card"
                    >
                      <div className="text-lg">{getAmenityIcon(amenity)}</div>
                      <span className="text-sm capitalize">
                        {amenity.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Règles de la maison</h2>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Animaux</span>
                    <span className={houseRules.pets ? "text-green-600" : "text-red-600"}>
                      {houseRules.pets ? "✓ Autorisés" : "✗ Non autorisés"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fumeur</span>
                    <span className={houseRules.smoking ? "text-green-600" : "text-red-600"}>
                      {houseRules.smoking ? "✓ Autorisé" : "✗ Non autorisé"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fêtes</span>
                    <span className={houseRules.parties ? "text-green-600" : "text-red-600"}>
                      {houseRules.parties ? "✓ Autorisées" : "✗ Non autorisées"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Check-in / Check-out</span>
                    <span>
                      {houseRules.checkIn || "15:00"} / {houseRules.checkOut || "11:00"}
                    </span>
                  </div>
                </div>
              </Card>
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
            <Card className="p-6 sticky top-24">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Prix sur demande
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Contactez-nous pour un devis personnalisé
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  Réserver
                </Button>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Statut</span>
                    <span className="font-medium capitalize">{currentListing.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Vues</span>
                    <span className="font-medium">{currentListing.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ajouté le</span>
                    <span className="font-medium">
                      {new Date(currentListing.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Ajouter aux favoris
                  </Button>
                </div>
              </div>
            </Card>
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
