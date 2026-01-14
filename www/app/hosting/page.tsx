import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card";
import { Navbar } from "@/components/navbar";

export default async function HostingPage() {
  // Récupérer tous les listings publiés
  const allListings = await db
    .select()
    .from(listings)
    .where(eq(listings.status, "published"))
    .orderBy(listings.createdAt);

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentSection={-1} 
        isAtTop={false} 
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-linear-to-b from-primary/5 to-background py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              🏡 Tous les logements
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre collection complète
            </p>
            <div className="text-sm text-muted-foreground">
              {allListings.length} {allListings.length > 1 ? "propriétés disponibles" : "propriété disponible"}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            <Button variant="outline" size="sm">
              Tout
            </Button>
            <Button variant="ghost" size="sm">
              Villa
            </Button>
            <Button variant="ghost" size="sm">
              Appartement
            </Button>
            <Button variant="ghost" size="sm">
              Maison
            </Button>
            <Button variant="ghost" size="sm">
              Vue mer
            </Button>
            <Button variant="ghost" size="sm">
              Piscine
            </Button>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
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
    </div>
  );
}
