import { Navbar } from "@/components/navbar";
import { FadeContent } from "@/components/ui/fade-content";
import { SectionHeader } from "@/components/landing/section-header";
import { MapPin, History, Star, Camera, Utensils, Waves } from "lucide-react";
import Link from "next/link";

// Data for cities
const cityData: Record<string, {
  name: string;
  history: string;
  description: string;
  activities: { title: string; description: string; icon: any }[];
  highlights: string[];
  images: {
    landscape: string;
    gallery: string[];
  };
}> = {
  "saint-tropez": {
    name: "Saint-Tropez",
    description: "Le joyau de la Côte d'Azur, célèbre pour son port, ses plages et son ambiance glamour.",
    history: "Ancien petit village de pêcheurs, Saint-Tropez est devenu une destination mondialement connue dans les années 50, propulsé par le cinéma et des icônes comme Brigitte Bardot. Malgré sa renommée, le village a su préserver son charme provençal avec ses ruelles colorées et sa célèbre place des Lices.",
    highlights: ["Le Port de Saint-Tropez", "La Citadelle", "La Plage de Pampelonne", "Le Musée de l'Annonciade"],
    activities: [
      { title: "Plages de Pampelonne", description: "Détendez-vous sur les plages les plus célèbres du monde.", icon: Waves },
      { title: "Shopping de Luxe", description: "Découvrez les boutiques des plus grandes maisons de couture.", icon: Star },
      { title: "Vie Nocturne", description: "Profitez des soirées légendaires dans les clubs exclusifs.", icon: Camera },
      { title: "Gastronomie", description: "Dégustez la célèbre Tarte Tropézienne sur le port.", icon: Utensils },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1534258936925-c48947387e3b?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1519865885898-a54a6f2c7dad?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800"
      ]
    }
  },
  "ramatuelle": {
    name: "Ramatuelle",
    description: "Un village médiéval perché offrant une vue imprenable sur la baie de Pampelonne.",
    history: "Bâti à flanc de colline pour échapper aux incursions sarrasines, Ramatuelle est un village en escargot typiquement provençal. Il est le gardien des célèbres plages de Pampelonne, tout en offrant un calme absolu dans ses terres.",
    highlights: ["Le Village Médiéval", "Le Phare de Camarat", "Les Moulins de Paillas", "Le Festival de Ramatuelle"],
    activities: [
      { title: "Randonnée Littorale", description: "Explorez le sentier du littoral et ses criques secrètes.", icon: Camera },
      { title: "Dégustation de Vin", description: "Visitez les domaines viticoles prestigieux de la presqu'île.", icon: Utensils },
      { title: "Plages Sauvages", description: "Découvrez l'Escalet et ses eaux cristallines.", icon: Waves },
      { title: "Culture", description: "Assistez à une pièce de théâtre sous les étoiles.", icon: Star },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1599020792689-9fde458e7e17?auto=format&fit=crop&w=800"
      ]
    }
  },
  "cannes": {
    name: "Cannes",
    description: "La cité du cinéma, entre élégance de la Croisette et authenticité du Suquet.",
    history: "De son passé de village de pêcheurs sur la colline du Suquet, Cannes s'est transformée au XIXe siècle en une station balnéaire aristocratique. Aujourd'hui, elle rayonne mondialement grâce à son Festival International du Film.",
    highlights: ["La Croisette", "Le Palais des Festivals", "Le Suquet", "Les Îles de Lérins"],
    activities: [
      { title: "La Croisette", description: "Promenez-vous le long des palaces et des plages de sable.", icon: Camera },
      { title: "Îles de Lérins", description: "Une escapade nature et historique à quelques minutes en bateau.", icon: Waves },
      { title: "Marché Forville", description: "Découvrez les saveurs locales dans ce marché couvert historique.", icon: Utensils },
      { title: "Shopping", description: "Les plus grandes marques sur la rue d'Antibes.", icon: Star },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1564754943164-e83c08469116?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1533633355069-262596be949c?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800"
      ]
    }
  },
  "sainte-maxime": {
    name: "Sainte-Maxime",
    description: "Une destination familiale et élégante face au golfe de Saint-Tropez.",
    history: "Sainte-Maxime a toujours été un port d'échanges important. Protégée des vents par les Maures, elle offre un climat exceptionnel qui a séduit de nombreux artistes et écrivains au fil des décennies.",
    highlights: ["La Promenade Simon Lorière", "Le Carré Léon Gaumont", "Le Port de Plaisance", "Les Plages de la Nartelle"],
    activities: [
      { title: "Sports Nautiques", description: "Jet-ski, voile et plongée dans les eaux claires du golfe.", icon: Waves },
      { title: "Golf", description: "Parcourez le magnifique Golf de Sainte-Maxime avec vue mer.", icon: Star },
      { title: "Balades en Mer", description: "Naviguez vers les calanques de l'Estérel.", icon: Camera },
      { title: "Marchés Provençaux", description: "Flânez entre les étals de produits locaux.", icon: Utensils },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800"
      ]
    }
  },
  "grimaud": {
    name: "Grimaud",
    description: "Un village médiéval authentique et sa cité lacustre unique, Port-Grimaud.",
    history: "Grimaud est l'un des plus anciens villages du massif des Maures. Dominé par son château féodal, il offre un contraste saisissant avec Port-Grimaud, la 'Venise Provençale' créée dans les années 60 par l'architecte François Spoerry.",
    highlights: ["Le Château de Grimaud", "Port-Grimaud", "L'Église Saint-Michel", "Le Pont des Fées"],
    activities: [
      { title: "Canaux de Port-Grimaud", description: "Louez un bateau électrique pour explorer la cité lacustre.", icon: Waves },
      { title: "Château Féodal", description: "Grimpez jusqu'aux ruines pour une vue panoramique sur le golfe.", icon: Camera },
      { title: "Vignobles", description: "Découvrez les vins AOC Côtes de Provence des domaines locaux.", icon: Utensils },
      { title: "Ruelles Médiévales", description: "Perdez-vous dans le charme intemporel du vieux village.", icon: Star },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1533633355069-262596be949c?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800"
      ]
    }
  },
  "les-issambres": {
    name: "Les Issambres",
    description: "Le quartier maritime de Roquebrune-sur-Argens, havre de paix et de nature.",
    history: "Anciennement lieu de villégiature prisé dès les années 30, Les Issambres ont conservé une atmosphère paisible. C'est ici que le débarquement de Provence a eu lieu en partie en 1944, marquant l'histoire de la région.",
    highlights: ["Le Sentier du Littoral", "Le Port de Plaisance", "La Plage de la Gaillarde", "Le Vivier Gallo-Romain"],
    activities: [
      { title: "Thalassothérapie", description: "Profitez d'un moment de détente absolue face à la mer.", icon: Star },
      { title: "Plongée Sous-Marine", description: "Explorez les fonds marins riches de la côte rocheuse.", icon: Waves },
      { title: "Sentier des Douaniers", description: "Une balade spectaculaire entre criques et pins parasols.", icon: Camera },
      { title: "Cuisine de la Mer", description: "Dégustez du poisson frais dans les restaurants du bord de mer.", icon: Utensils },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1544551763-46a8723ba3f9?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800"
      ]
    }
  },
  "cap-d-antibes": {
    name: "Cap d'Antibes",
    description: "Une presqu'île de rêve, écrin de verdure et de propriétés légendaires.",
    history: "Le Cap d'Antibes est devenu à la fin du XIXe siècle le refuge de l'aristocratie et des artistes. De Scott Fitzgerald à Picasso, tous ont été séduis par sa lumière unique et ses villas cachées dans les pins.",
    highlights: ["Le Phare de la Garoupe", "Le Sentier de Tire-Poil", "La Villa Eilenroc", "L'Hôtel du Cap-Eden-Roc"],
    activities: [
      { title: "Sentier du Littoral", description: "Le tour du Cap, l'une des plus belles balades de la Riviera.", icon: Camera },
      { title: "Plage de la Garoupe", description: "Une crique mythique aux eaux turquoise.", icon: Waves },
      { title: "Jardins Botaniques", description: "Visitez les parcs exceptionnels des villas historiques.", icon: Star },
      { title: "Gastronomie Étoilée", description: "Vivez une expérience culinaire hors du commun.", icon: Utensils },
    ],
    images: {
      landscape: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1583212235753-825ea951cd72?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
      ]
    }
  }
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = cityData[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    description: "Une destination magnifique sur la Riviera française.",
    history: "Cette ville possède une histoire riche liée au développement de la Côte d'Azur.",
    highlights: ["Le centre historique", "Le front de mer", "Les marchés locaux"],
    activities: [
      { title: "Découverte", description: "Explorez les charmes cachés de la ville.", icon: Camera },
      { title: "Détente", description: "Profitez du soleil et de la mer.", icon: Waves },
    ],
    images: {
      landscape: "/media/image.png",
      gallery: ["/media/chair.png", "/media/room.png", "/media/salon.png"]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentSection={-1} 
        isAtTop={false} 
      />

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="px-4 md:px-6">
          <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.images.landscape})` }} />
            <div className="relative z-20 text-center text-white px-6">
              <FadeContent>
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full flex items-center gap-2 border border-white/30">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase tracking-wider">Destination</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.name}</h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light opacity-90">
                  {data.description}
                </p>
              </FadeContent>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeContent>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <History className="w-6 h-6" />
                  <span className="font-semibold uppercase tracking-widest text-sm">Un peu d'histoire</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  L'âme de {data.name}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {data.history}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {data.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeContent>
            <FadeContent delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg translate-y-8">
                  <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${data.images.gallery[0]})` }} />
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${data.images.gallery[1]})` }} />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${data.images.gallery[2]})` }} />
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-20 bg-neutral-50 px-6">
          <div className="max-w-7xl mx-auto">
            <FadeContent>
              <SectionHeader
                badge="Expériences 🐚"
                title="Que faire à"
                highlight={data.name}
                align="center"
                className="mb-16"
              />
            </FadeContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.activities.map((activity, i) => (
                <FadeContent key={i} delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 h-full group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <activity.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900">{activity.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <FadeContent>
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Prêt à découvrir {data.name} ?</h2>
              <p className="text-neutral-600">
                Explorez notre sélection de villas d'exception et vivez une expérience inoubliable sur la Riviera.
              </p>
              <Link 
                href="/hosting"
                className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Voir nos logements à {data.name}
              </Link>
            </div>
          </FadeContent>
        </section>
      </main>
    </div>
  );
}

