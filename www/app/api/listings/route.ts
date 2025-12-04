import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq, ilike, or, desc, asc } from "drizzle-orm";

// GET /api/listings - Liste des villas avec filtres et recherche
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    let query = db.select().from(listings);

    // Filtres
    const conditions = [];
    if (status) {
      conditions.push(eq(listings.status, status as any));
    }
    if (city) {
      conditions.push(eq(listings.city, city));
    }
    if (search) {
      conditions.push(
        or(
          ilike(listings.title, `%${search}%`),
          ilike(listings.location, `%${search}%`),
          ilike(listings.description, `%${search}%`)
        )
      );
    }

    // Appliquer les filtres
    if (conditions.length > 0) {
      query = query.where(
        conditions.length === 1 ? conditions[0] : or(...conditions)
      ) as any;
    }

    // Tri
    const orderFn = order === "asc" ? asc : desc;
    query = query.orderBy(orderFn(listings.createdAt)) as any;

    const results = await query;

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

// POST /api/listings - Créer une nouvelle villa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newListing = await db.insert(listings).values({
      title: body.title,
      description: body.description,
      location: body.location,
      address: body.address,
      city: body.city,
      country: body.country || "France",
      latitude: body.latitude,
      longitude: body.longitude,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      maxGuests: body.maxGuests,
      surface: body.surface,
      amenities: body.amenities || [],
      houseRules: body.houseRules || {
        pets: false,
        smoking: false,
        parties: false,
        checkIn: "15:00",
        checkOut: "11:00",
      },
      images: body.images || [],
      coverImage: body.coverImage,
      status: body.status || "draft",
      featured: body.featured || false,
    }).returning();

    return NextResponse.json({
      success: true,
      data: newListing[0],
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
