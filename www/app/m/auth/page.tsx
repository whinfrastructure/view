import type { Metadata } from "next";
import Link from "next/link";
import { AutoOpen } from "./auto-open";

export const metadata: Metadata = {
  title: "Ouvrir Welkom Home — Connexion",
  description: "Ouvre ton application Welkom Home pour terminer la connexion.",
  robots: { index: false, follow: false },
};

const APP_SCHEME = "welkomhome";

const CREAM = "#f3ecd9";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const COCOA = "#3a2415";

// TODO Phase 3: replace with real App Store / Play Store URLs once published.
const APP_STORE_URL = "https://welkom-home.fr/";
const PLAY_STORE_URL = "https://welkom-home.fr/";

export default async function MAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const deepLink = token
    ? `${APP_SCHEME}://m/auth?token=${encodeURIComponent(token)}`
    : null;

  return (
    <main style={{ minHeight: "100vh", background: CREAM, padding: "60px 20px" }}>
      {deepLink && <AutoOpen url={deepLink} />}
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            color: CLAY,
            letterSpacing: "0.34em",
            fontSize: 11,
            textTransform: "uppercase",
          }}
        >
          ◆ Connexion à l&apos;app
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: INK_WARM,
            fontSize: 40,
            lineHeight: 1.1,
            marginTop: 16,
          }}
        >
          Ouvre <em>Welkom Home</em>{" "}
          <span style={{ background: "#ecdfba" }}>sur ton appareil</span>.
        </h1>
        <p
          style={{
            color: INK_WARM,
            opacity: 0.85,
            fontSize: 15,
            lineHeight: 1.7,
            marginTop: 20,
          }}
        >
          Si l&apos;app ne s&apos;est pas ouverte automatiquement, touche le bouton
          ci-dessous. Sinon, télécharge-la — ton lien reste valide 15 minutes.
        </p>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {deepLink && (
            <a
              href={deepLink}
              style={{
                background: COCOA,
                color: CREAM,
                padding: "16px 24px",
                textDecoration: "none",
                letterSpacing: "0.3em",
                fontSize: 11,
                textTransform: "uppercase",
                borderRadius: 2,
              }}
            >
              Ouvrir dans l&apos;app
            </a>
          )}
          <a
            href={APP_STORE_URL}
            style={{
              border: `1px solid ${INK_WARM}`,
              color: INK_WARM,
              padding: "14px 24px",
              textDecoration: "none",
              letterSpacing: "0.3em",
              fontSize: 11,
              textTransform: "uppercase",
              borderRadius: 2,
            }}
          >
            Télécharger sur l&apos;App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            style={{
              border: `1px solid ${INK_WARM}`,
              color: INK_WARM,
              padding: "14px 24px",
              textDecoration: "none",
              letterSpacing: "0.3em",
              fontSize: 11,
              textTransform: "uppercase",
              borderRadius: 2,
            }}
          >
            Disponible sur Google Play
          </a>
        </div>

        {token && (
          <p
            style={{
              marginTop: 40,
              fontSize: 11,
              color: CLAY,
              fontFamily: "monospace",
              opacity: 0.7,
              wordBreak: "break-all",
            }}
          >
            ref: {token.slice(0, 16)}…
          </p>
        )}

        <p style={{ marginTop: 40, fontSize: 12, color: INK_WARM, opacity: 0.6 }}>
          <Link href="/" style={{ color: INK_WARM, textUnderlineOffset: 3 }}>
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
