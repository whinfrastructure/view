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
    <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          ← Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
