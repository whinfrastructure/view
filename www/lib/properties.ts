import "server-only";
import { api, apiRaw, ApiException } from "./api";

export type PropertyType = "villa" | "mas" | "appartement" | "chalet" | "maison";
export type ViewType = "sea" | "panoramic" | "garden" | "mountain" | "none";
export type PoolType = "private" | "shared";

/** Shape returned by GET /api/v1/properties (public list). */
export type PropertyListItem = {
  id: string;
  slug: string;
  reference?: string;
  name: string;
  type: PropertyType;
  short_desc?: string | null;
  city?: string | null;
  region?: string | null;
  country: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price_eur?: number | null;
  currency: string;
  cover_photo?: string | null;
  view_type?: ViewType | null;
  has_pool: boolean;
  amenities?: string[];
};

export type Photo = {
  id: string;
  property_id: string;
  url: string;
  position: number;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  category?: string | null;
  created_at: string;
};

export type Bed = {
  id: string;
  property_id: string;
  room_label?: string | null;
  bed_type: "double" | "queen" | "king" | "single" | "sofa-bed" | "baby-cot" | "bunk";
  count: number;
  position: number;
};

export type Season = {
  id: string;
  property_id: string;
  name: string;
  start_date: string;
  end_date: string;
  price_per_night_eur: number;
  min_nights?: number | null;
  position: number;
};

export type Review = {
  id: string;
  property_id: string;
  author_name: string;
  author_city?: string | null;
  rating?: number | null;
  body: string;
  stay_at?: string | null;
  published: boolean;
  created_at: string;
};

/** Full payload returned by GET /api/v1/properties/:slug. */
export type PropertyDetail = {
  id: string;
  slug: string;
  reference?: string;
  status: string;
  name: string;
  type: PropertyType;
  short_desc?: string | null;
  description?: string | null;
  address_full?: string | null;
  city?: string | null;
  region?: string | null;
  postal_code?: string | null;
  country: string;
  micro_zone?: string | null;
  lat?: number | null;
  lng?: number | null;
  distance_beach_m?: number | null;
  distance_shops_m?: number | null;
  distance_airport_km?: number | null;
  distance_train_km?: number | null;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  surface_m2?: number | null;
  terrain_m2?: number | null;
  view_type?: ViewType | null;
  has_pool: boolean;
  pool_type?: PoolType | null;
  pool_heated?: boolean | null;
  pool_dimensions?: string | null;
  pool_infinity?: boolean | null;
  has_jacuzzi: boolean;
  has_sauna: boolean;
  has_fitness: boolean;
  has_pool_house: boolean;
  has_ac: boolean;
  has_wifi: boolean;
  has_parking: boolean;
  parking_spots?: number | null;
  base_price_eur?: number | null;
  currency: string;
  min_nights: number;
  cleaning_fee_eur?: number | null;
  deposit_eur?: number | null;
  pets_allowed: boolean;
  smoking_allowed: boolean;
  parties_allowed: boolean;
  amenities: string[];
  highlights: string[];
  tags: string[];
  photos?: Photo[];
  beds?: Bed[];
  seasons?: Season[];
  reviews?: Review[];
};

export type PaginatedProperties = {
  data: PropertyListItem[];
  pagination: { page: number; limit: number; total: number; total_pages: number };
};

export type PublicListParams = {
  page?: number;
  limit?: number;
  sort?: "created_at" | "base_price_eur" | "bedrooms" | "name";
  order?: "asc" | "desc";
  city?: string;
  region?: string;
  country?: string;
  bedrooms_min?: number;
  guests_min?: number;
  price_min?: number;
  price_max?: number;
  amenities?: string;
  q?: string;
};

function toQuery(p: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(p)) {
    if (v === undefined || v === null || v === "") continue;
    parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return parts.length ? "?" + parts.join("&") : "";
}

export const publicProperties = {
  list(params: PublicListParams = {}) {
    return apiRaw<PaginatedProperties>("/properties" + toQuery(params));
  },
  /** Returns null when the slug is unknown (404). */
  async get(slug: string): Promise<PropertyDetail | null> {
    try {
      return await api<PropertyDetail>(`/properties/${encodeURIComponent(slug)}`, { auth: false });
    } catch (err) {
      if (err instanceof ApiException && err.status === 404) return null;
      throw err;
    }
  },
};
