// Shared TypeScript types (no DB dependency)

export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  surface?: number | null;
  amenities: string[];
  houseRules?: {
    pets?: boolean;
    smoking?: boolean;
    parties?: boolean;
    checkIn?: string;
    checkOut?: string;
  } | null;
  images: string[];
  coverImage?: string | null;
  status: string;
  featured?: boolean | null;
  viewCount?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  // JSON data extra fields
  pricePerNight?: number;
  weeklyPriceRange?: string;
  sourceUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: string | Date | null;
}
