import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const listingStatusEnum = pgEnum("listing_status", ["draft", "published", "archived"]);

// ===== BETTER AUTH TABLES =====

// User Table (Better Auth)
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  // Admin plugin fields
  role: text("role").default("user"),
  banned: boolean("banned").default(false),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires"),
});

// Session Table (Better Auth)
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonatedBy"),
});

// Account Table (Better Auth - for OAuth)
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Verification Table (Better Auth)
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// ===== APPLICATION TABLES =====

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
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  listingId: integer("listing_id").notNull().references(() => listings.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===== RELATIONS =====

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  favorites: many(favorites),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
export const listingsRelations = relations(listings, ({ many }) => ({
  favorites: many(favorites),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(user, {
    fields: [favorites.userId],
    references: [user.id],
  }),
  listing: one(listings, {
    fields: [favorites.listingId],
    references: [listings.id],
  }),
}));

// ===== TYPESCRIPT TYPES =====

// Better Auth types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;

// Application types
export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;
