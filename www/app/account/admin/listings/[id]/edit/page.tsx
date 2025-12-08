"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, Save, X } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const AMENITIES_OPTIONS = [
  { id: "wifi", label: "WiFi" },
  { id: "pool", label: "Piscine" },
  { id: "air_conditioning", label: "Climatisation" },
  { id: "kitchen", label: "Cuisine équipée" },
  { id: "parking", label: "Parking" },
  { id: "sea_view", label: "Vue mer" },
  { id: "mountain_view", label: "Vue montagne" },
  { id: "jacuzzi", label: "Jacuzzi" },
  { id: "garden", label: "Jardin" },
  { id: "terrace", label: "Terrasse" },
  { id: "bbq", label: "Barbecue" },
  { id: "gym", label: "Salle de sport" },
  { id: "home_cinema", label: "Home cinéma" },
  { id: "sauna", label: "Sauna" },
  { id: "wine_cellar", label: "Cave à vin" },
];

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    city: "",
    country: "France",
    latitude: "",
    longitude: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    surface: 0,
    amenities: [] as string[],
    houseRules: {
      pets: false,
      smoking: false,
      parties: false,
      checkIn: "15:00",
      checkOut: "11:00",
    },
    images: [] as string[],
    coverImage: "",
    status: "draft" as "draft" | "published",
    featured: false,
  });

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setFormData({
          title: data.data.title,
          description: data.data.description,
          location: data.data.location,
          address: data.data.address || "",
          city: data.data.city || "",
          country: data.data.country || "France",
          latitude: data.data.latitude || "",
          longitude: data.data.longitude || "",
          bedrooms: data.data.bedrooms,
          bathrooms: data.data.bathrooms,
          maxGuests: data.data.maxGuests,
          surface: data.data.surface || 0,
          amenities: data.data.amenities || [],
          houseRules: data.data.houseRules || {
            pets: false,
            smoking: false,
            parties: false,
            checkIn: "15:00",
            checkOut: "11:00",
          },
          images: data.data.images || [],
          coverImage: data.data.coverImage || "",
          status: data.data.status,
          featured: data.data.featured,
        });
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/listings/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/account/admin/listings");
      } else {
        alert("Erreur lors de la modification de la villa");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      alert("Erreur lors de la modification de la villa");
    } finally {
      setSaving(false);
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const setCoverImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: url,
    }));
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Building2 className="w-8 h-8" />
          Modifier la Villa
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Informations de base</h2>

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full min-h-[120px] px-3 py-2 rounded-md border bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut *</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>

            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span>Villa mise en avant</span>
              </label>
            </div>
          </div>
        </section>

        {/* Localisation */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Localisation</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localisation courte *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse complète</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* Caractéristiques */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Caractéristiques</h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Chambres *</Label>
              <Input
                id="bedrooms"
                type="number"
                min="1"
                required
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Salles de bains *</Label>
              <Input
                id="bathrooms"
                type="number"
                min="1"
                required
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGuests">Pers. max *</Label>
              <Input
                id="maxGuests"
                type="number"
                min="1"
                required
                value={formData.maxGuests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxGuests: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surface">Surface (m²)</Label>
              <Input
                id="surface"
                type="number"
                min="0"
                value={formData.surface}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    surface: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Équipements */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Équipements</h2>

          <div className="grid grid-cols-3 gap-3">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label
                key={amenity.id}
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity.id)}
                  onChange={() => toggleAmenity(amenity.id)}
                  className="w-4 h-4"
                />
                <span>{amenity.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Règles de la maison */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Règles de la maison</h2>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.houseRules.pets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    houseRules: {
                      ...formData.houseRules,
                      pets: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4"
              />
              <span>Animaux acceptés</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.houseRules.smoking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    houseRules: {
                      ...formData.houseRules,
                      smoking: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4"
              />
              <span>Fumeur autorisé</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.houseRules.parties}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    houseRules: {
                      ...formData.houseRules,
                      parties: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4"
              />
              <span>Fêtes autorisées</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Heure d'arrivée</Label>
              <Input
                id="checkIn"
                type="time"
                value={formData.houseRules.checkIn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    houseRules: {
                      ...formData.houseRules,
                      checkIn: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Heure de départ</Label>
              <Input
                id="checkOut"
                type="time"
                value={formData.houseRules.checkOut}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    houseRules: {
                      ...formData.houseRules,
                      checkOut: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Images</h2>

          <div className="space-y-4">
            <UploadDropzone
              endpoint="listingImageUploader"
              onClientUploadComplete={(res: any) => {
                if (res) {
                  const newImages = res.map((file: any) => file.url);
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...newImages],
                    coverImage: prev.coverImage || newImages[0],
                  }));
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Erreur: ${error.message}`);
              }}
              config={{ mode: "auto" }}
            />

            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-transparent hover:border-primary transition"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {formData.coverImage === url ? (
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                        Cover
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCoverImage(url)}
                        className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                      >
                        Définir comme cover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
