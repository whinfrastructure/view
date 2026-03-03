"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Users, BedDouble, Bath, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/types";

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
    <Link href={`/hosting/${listing.id}`} className="block h-full group">
      <div className="flex flex-col h-full bg-background border border-border/50 hover:border-primary/30 transition-colors duration-500 rounded-sm overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {listing.coverImage ? (
            <Image
              src={listing.coverImage}
              alt={listing.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <span className="text-4xl">🏡</span>
            </div>
          )}
          {/* Favorite Button */}
          <button
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 transition-colors z-10"
            onClick={handleFavoriteClick}
          >
            <Heart className="h-4 w-4" />
          </button>
          
          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/40 text-white text-[10px] uppercase tracking-widest font-medium z-10">
              Exclusivité
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Location */}
          <div className="text-[10px] tracking-[0.2em] uppercase text-primary/80 mb-2 font-medium">
            {listing.location}
          </div>

          {/* Title */}
          <h3 className="font-playfair text-2xl font-light leading-snug group-hover:text-primary transition-colors line-clamp-1 mb-3">
            {listing.title}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-3 text-xs font-light text-muted-foreground mt-auto border-t border-border/50 pt-4">
            <div className="flex items-center gap-1.5">
              <span>{listing.bedrooms} ch</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-1.5">
              <span>{listing.bathrooms} sdb</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-1.5">
              <span>{listing.maxGuests} pers</span>
            </div>
            {listing.surface && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1.5">
                  <span>{listing.surface}m²</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
