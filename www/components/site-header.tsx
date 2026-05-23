import Link from "next/link";
import { logout } from "@/app/actions/auth";
import type { Me } from "@/lib/api";

export function SiteHeader({ me, transparent = false }: { me: Me | null; transparent?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-20 border-b ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-zinc-200 bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white">
            w
          </span>
          <span className="text-zinc-900">Welkom Home</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/listing" className="text-zinc-700 hover:text-zinc-900">
            Villas
          </Link>
          {me ? (
            <UserMenu email={me.email} firstName={me.first_name} />
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
            >
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function UserMenu({ email, firstName }: { email: string; firstName: string | null }) {
  const display = firstName || email.split("@")[0];
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600">{display}</span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
