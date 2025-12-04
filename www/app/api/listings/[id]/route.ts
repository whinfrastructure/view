import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/listings/[id] - Récupérer une villa par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listingId = parseInt(id);

    if (isNaN(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(listings)
      .where(eq(listings.id, listingId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

// PATCH /api/listings/[id] - Mettre à jour une villa
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listingId = parseInt(id);

    if (isNaN(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedListing = await db
      .update(listings)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(listings.id, listingId))
      .returning();

    if (updatedListing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedListing[0],
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

// DELETE /api/listings/[id] - Supprimer une villa
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listingId = parseInt(id);

    if (isNaN(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const deletedListing = await db
      .delete(listings)
      .where(eq(listings.id, listingId))
      .returning();

    if (deletedListing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
