import { NextResponse, type NextRequest } from "next/server";
import { verifyMagicToken } from "@/app/actions/auth";

/**
 * Magic-link callback for the public site.
 *
 * If the user turns out to be an admin, we send them straight to the admin app
 * (set ADMIN_URL in the environment). Regular users land on /listing.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const result = await verifyMagicToken(token);

  if (!result.ok) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", result.error);
    return NextResponse.redirect(url);
  }

  if (result.role === "admin") {
    const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3001";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.redirect(new URL("/listing", req.url));
}
