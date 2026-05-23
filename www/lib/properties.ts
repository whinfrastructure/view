import "server-only";
import { apiRaw } from "./api";

export type PropertyType = "villa" | "mas" | "appartement" | "chalet" | "maison";
export type ViewType = "sea" | "panoramic" | "garden" | "mountain" | "none";

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
};
