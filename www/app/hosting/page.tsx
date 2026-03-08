import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card";
import { Navbar } from "@/components/navbar";
import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";

export default function HostingPage() {
  const allListings: Listing[] = (listingsData as Omit<Listing, "id">[]).map(
    (l, i) => ({
      ...l,
      id: i + 1,
      images: [],
      houseRules: null,
    })
  ).filter((l) => l.status === "published");

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentSection={-1} 
        isAtTop={false} 
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 px-6 md:py-32 flex flex-col items-center justify-center border-b border-border/50">
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <span className="uppercase tracking-[0.3em] text-xs font-medium text-primary block">
              PORTFOLIO EXCLUSIF
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground font-playfair leading-none">
              Nos Demeures <br className="hidden md:block"/>
              <span className="font-mea-culpa text-6xl md:text-8xl lg:text-9xl text-primary/80 lowercase italic block transform -translate-y-4 md:-translate-y-8">d'exception</span>
            </h1>
            <p className="text-sm md:text-base font-light text-muted-foreground max-w-xl mx-auto instrument">
              Explorez notre collection triée sur le volet de propriétés de prestige sur la Côte d'Azur.
            </p>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 pt-8 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-border"></span>
              {allListings.length} {allListings.length > 1 ? "propriétés" : "propriété"}
              <span className="h-px w-8 bg-border"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-6 overflow-x-auto no-scrollbar items-center justify-center w-full">
            <button className="text-[10px] uppercase tracking-[0.2em] font-medium text-primary border-b border-primary pb-1 whitespace-nowrap">
              Toutes les villas
            </button>
            <button className="text-[10px] uppercase tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors pb-1 whitespace-nowrap">
              Pieds dans l'eau
            </button>
            <button className="text-[10px] uppercase tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors pb-1 whitespace-nowrap">
              Vue Panoramique
            </button>
            <button className="text-[10px] uppercase tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors pb-1 whitespace-nowrap">
              Avec Personnel
            </button>
            <button className="text-[10px] uppercase tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors pb-1 whitespace-nowrap">
              Ultra Luxe
            </button>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {allListings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Aucun logement disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
      </main>
    </div>
  );
}
