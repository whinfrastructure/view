"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Users, BedDouble, Bath, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/db/schema";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement favorite toggle
    console.log("Toggle favorite for listing:", listing.id);
  };

  return (
    <Link href={`/hosting/${listing.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {listing.coverImage ? (
            <Image
              src={listing.coverImage}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="text-6xl">🏡</span>
            </div>
          )}
          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            onClick={handleFavoriteClick}
          >
            <Heart className="h-4 w-4" />
          </button>
          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              ⭐ Coup de coeur
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{listing.maxGuests}</span>
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              <span>{listing.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              <span>{listing.bathrooms}</span>
            </div>
            {listing.surface && (
              <div className="text-xs">
                {listing.surface}m²
              </div>
            )}
          </div>

          {/* Description Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </p>

          {/* Views */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            {listing.viewCount} vues
          </div>
        </div>
      </Card>
    </Link>
  );
}
