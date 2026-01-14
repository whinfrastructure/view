"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MapPin,
  BedDouble,
  Users,
  Star,
  Upload,
} from "lucide-react";


type Listing = {
  id: number;
  title: string;
  location: string;
  city: string;
  bedrooms: number;
  maxGuests: number;
  status: "draft" | "published" | "archived";
  featured: boolean;
  viewCount: number;
  coverImage: string | null;
  createdAt: string;
};

export default function AdminListingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [bulkJsonDialogOpen, setBulkJsonDialogOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: boolean;
    inserted?: number;
    errors?: any[];
  } | null>(null);

  // Protection admin
  useEffect(() => {
    if (session && (session.user as any)?.role !== "admin") {
      router.push("/account");
    }
  }, [session, router]);

  // Récupérer les listings
  useEffect(() => {
    fetchListings();
  }, [statusFilter, cityFilter, search]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (cityFilter !== "all") params.append("city", cityFilter);
      if (search) params.append("search", search);

      const response = await fetch(`/api/listings?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setListings(data.data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchListings(); // Refresh list
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleBulkImport = async () => {
    setBulkLoading(true);
    setBulkResult(null);
    
    try {
      const jsonData = JSON.parse(jsonInput);
      
      const response = await fetch("/api/admin/listings/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonData }),
      });

      const result = await response.json();
      setBulkResult(result);

      if (result.success) {
        fetchListings(); // Refresh list
        setTimeout(() => {
          setBulkJsonDialogOpen(false);
          setJsonInput("");
          setBulkResult(null);
        }, 2000);
      }
    } catch (error) {
      setBulkResult({
        success: false,
        errors: [{ error: error instanceof Error ? error.message : "Invalid JSON" }],
      });
    } finally {
      setBulkLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: "bg-green-500/10 text-green-500 border-green-500/20",
      draft: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    const labels = {
      published: "Publié",
      draft: "Brouillon",
      archived: "Archivé",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const cities = [...new Set(listings.map((l) => l.city))].filter(Boolean);

  if (!session || (session.user as any)?.role !== "admin") {
    return null;
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            Gestion des Villas
          </h1>
          <p className="text-muted-foreground mt-1">
            {listings.length} villa{listings.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={bulkJsonDialogOpen} onOpenChange={setBulkJsonDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Importer des listings depuis JSON</DialogTitle>
                <DialogDescription>
                  Collez votre JSON (array de listings) ci-dessous. Format attendu: nom, localisation, nombre_chambres, capacite_accueil, description, images.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder='[{"nom": "Villa...", "localisation": "...", ...}]'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              {bulkResult && (
                <div className={`p-3 rounded-lg ${bulkResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                  {bulkResult.success ? (
                    <p>✓ {bulkResult.inserted} listing(s) créé(s) avec succès!</p>
                  ) : (
                    <div>
                      <p>✗ Erreur lors de l&apos;import:</p>
                      {bulkResult.errors?.map((err, idx) => (
                        <p key={idx} className="text-xs mt-1">- {err.error}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBulkJsonDialogOpen(false);
                    setJsonInput("");
                    setBulkResult(null);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleBulkImport}
                  disabled={bulkLoading || !jsonInput.trim()}
                >
                  {bulkLoading ? "Import en cours..." : "Importer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => router.push("/account/admin/listings/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvelle Villa
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une villa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-md border bg-background"
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
          <option value="archived">Archivé</option>
        </select>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-4 py-2 rounded-md border bg-background"
        >
          <option value="all">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune villa trouvée
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Villa</th>
                <th className="text-left p-4 font-medium">Localisation</th>
                <th className="text-left p-4 font-medium">Capacité</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-left p-4 font-medium">Vues</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-t hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {listing.coverImage ? (
                        <img
                          src={listing.coverImage}
                          alt={listing.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {listing.title}
                          {listing.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {listing.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {listing.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-muted-foreground" />
                        {listing.bedrooms} chambres
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {listing.maxGuests} pers. max
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(listing.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      {listing.viewCount}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/account/admin/listings/${listing.id}/edit`)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer la villa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Voulez-vous vraiment
                              supprimer la villa "{listing.title}" (ID: {listing.id}) ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                              <Button variant="ghost">Annuler</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(listing.id)}
                              >
                                Supprimer
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
