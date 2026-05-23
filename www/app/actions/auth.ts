"use server";

import { redirect } from "next/navigation";
import { ApiException, auth } from "@/lib/api";
import { clearSession, getRefreshToken, setSession } from "@/lib/session";

export type LoginState =
  | { ok?: undefined; error?: string }
  | { ok: true; email: string };

export async function requestMagicLink(
  _prev: LoginState | undefined,
  fd: FormData,
): Promise<LoginState> {
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Adresse email invalide." };
  }
  try {
    await auth.requestMagicLink(email);
    return { ok: true, email };
  } catch (err) {
    if (err instanceof ApiException && err.status === 429) {
      return { error: "Trop de tentatives, réessaie dans une minute." };
    }
    return { error: "Impossible d'envoyer le lien. Réessaie plus tard." };
  }
}

export type VerifyResult =
  | { ok: true; role: "admin" | "user" }
  | { ok: false; error: string };

export async function verifyMagicToken(token: string): Promise<VerifyResult> {
  if (!token) return { ok: false, error: "Lien invalide ou expiré." };
  try {
    const data = await auth.verify(token);
    await setSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      role: data.user.role,
    });
    return { ok: true, role: data.user.role };
  } catch (err) {
    if (err instanceof ApiException) {
      if (err.code === "invalid_or_expired_token")
        return { ok: false, error: "Ce lien a expiré ou a déjà été utilisé." };
      if (err.code === "account_suspended")
        return { ok: false, error: "Ce compte est suspendu." };
    }
    return { ok: false, error: "Impossible de te connecter. Redemande un lien." };
  }
}

export async function logout(): Promise<void> {
  const refresh = await getRefreshToken();
  if (refresh) {
    try { await auth.logout(refresh); } catch { /* best-effort */ }
  }
  await clearSession();
  redirect("/");
}
