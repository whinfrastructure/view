import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const listingStatusEnum = pgEnum("listing_status", ["draft", "published", "archived"]);

// Listings Table (Villas)
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }).default("France"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  
  // Caractéristiques
  bedrooms: integer("bedrooms").notNull().default(1),
  bathrooms: integer("bathrooms").notNull().default(1),
  maxGuests: integer("max_guests").notNull().default(2),
  surface: integer("surface"), // en m²
  
  // Équipements (JSON array)
  amenities: json("amenities").$type<string[]>().default([]),
  // Ex: ["wifi", "pool", "air_conditioning", "kitchen", "parking", "sea_view", "jacuzzi", "gym", "garden"]
  
  // Règles de la maison (JSON)
  houseRules: json("house_rules").$type<{
    pets: boolean;
    smoking: boolean;
    parties: boolean;
    checkIn: string;
    checkOut: string;
  }>().default({
    pets: false,
    smoking: false,
    parties: false,
    checkIn: "15:00",
    checkOut: "11:00",
  }),
  
  // Images
  images: json("images").$type<string[]>().default([]), // Array of image URLs
  coverImage: text("cover_image"), // URL de l'image principale
  
  // Métadonnées
  status: listingStatusEnum("status").default("draft").notNull(),
  featured: boolean("featured").default(false), // Villa mise en avant
  viewCount: integer("view_count").default(0),
  
  // Dates
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Favorites Table (Favoris des utilisateurs)
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Foreign key to user table from Better Auth
  listingId: integer("listing_id").notNull().references(() => listings.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const listingsRelations = relations(listings, ({ many }) => ({
  favorites: many(favorites),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  listing: one(listings, {
    fields: [favorites.listingId],
    references: [listings.id],
  }),
}));

// Types TypeScript
export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;
