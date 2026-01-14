import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { jsonData } = body;

    if (!jsonData || !Array.isArray(jsonData)) {
      return NextResponse.json(
        { error: "Invalid JSON data. Expected an array of listings." },
        { status: 400 }
      );
    }

    // Transform and insert listings
    const insertedListings = [];
    const errors = [];

    for (const item of jsonData) {
      try {
        const listing = {
          title: item.nom || "Sans titre",
          description: item.description || "",
          location: item.localisation || "",
          bedrooms: item.nombre_chambres || 1,
          bathrooms: Math.ceil((item.nombre_chambres || 1) / 2), // Estimate
          maxGuests: item.capacite_accueil || 2,
          images: Array.isArray(item.images) ? item.images : [],
          coverImage: Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null,
          status: "published" as const,
          amenities: [] as string[],
          houseRules: {
            pets: false,
            smoking: false,
            parties: false,
            checkIn: "15:00",
            checkOut: "11:00",
          },
        };

        const [inserted] = await db.insert(listings).values(listing).returning();
        insertedListings.push(inserted);
      } catch (error) {
        errors.push({
          item: item.nom,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      inserted: insertedListings.length,
      errors: errors.length > 0 ? errors : undefined,
      listings: insertedListings,
    });
  } catch (error) {
    console.error("Error bulk creating listings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
