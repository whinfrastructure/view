"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ListingDetailClient() {
  const router = useRouter();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Partager ce logement",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> 
          Retour au portfolio
        </button>
        <div className="flex gap-4">
          <button 
            onClick={handleShare}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Partager"
          >
            <Share2 className="h-4 w-4 stroke-[1.5]" />
          </button>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Ajouter aux favoris"
          >
            <Heart className="h-4 w-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
