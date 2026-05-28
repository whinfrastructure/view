"use client";

import { useEffect } from "react";

// Auto-open the mobile app via its custom URL scheme. Renders nothing.
// On iOS/Android with the app installed, the browser prompts to open it.
// On desktop or without the app, nothing happens and the user sees the
// surrounding fallback page (install links + manual "Open in app" button).
export function AutoOpen({ url }: { url: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.location.href = url;
    }, 200);
    return () => window.clearTimeout(t);
  }, [url]);
  return null;
}
