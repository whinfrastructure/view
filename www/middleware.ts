import { NextResponse, type NextRequest } from "next/server";

// Maintenance toggle. Set `MAINTENANCE_MODE=true` in the env to serve the
// /maintenance page for every public route. Flip back to anything else (or
// remove the var) to restore normal operation.
const MAINTENANCE = process.env.MAINTENANCE_MODE === "true";

export function middleware(req: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Always let through:
  //  - the maintenance page itself
  //  - Next.js internals + static assets (CSS/JS/fonts for the page to render)
  //  - the brand SVG/PNGs in /public used by the page (logo, ornaments)
  //  - favicons / icon manifest
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    pathname === "/apple-icon.png" ||
    pathname === "/manifest.json" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    // Public assets used by the maintenance page UI itself.
    pathname === "/wh.svg" ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2")
  ) {
    return NextResponse.next();
  }

  // Rewrite (not redirect) so the URL stays as-is — visitors see their
  // original URL with the maintenance content. Status 503 tells search
  // engines + crawlers we're temporarily down so the index isn't lost.
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  const res = NextResponse.rewrite(url);
  res.headers.set("Retry-After", "3600");
  return res;
}

export const config = {
  matcher: [
    // Run middleware on all requests except Next.js internals.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
