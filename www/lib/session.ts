import "server-only";
import { cookies } from "next/headers";

const ACCESS = "wh_view_access";
const REFRESH = "wh_view_refresh";
const ROLE = "wh_view_role";

const accessMaxAge = 60 * 60;            // 1h
const refreshMaxAge = 60 * 60 * 24 * 30; // 30d
const isProd = process.env.NODE_ENV === "production";

export type SessionRole = "admin" | "user";

export async function setSession(opts: {
  accessToken: string;
  refreshToken: string;
  role: SessionRole;
}) {
  const jar = await cookies();
  jar.set(ACCESS, opts.accessToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: accessMaxAge,
  });
  jar.set(REFRESH, opts.refreshToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: refreshMaxAge,
  });
  jar.set(ROLE, opts.role, {
    httpOnly: false, secure: isProd, sameSite: "lax", path: "/", maxAge: refreshMaxAge,
  });
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS)?.value;
}
export async function getRefreshToken(): Promise<string | undefined> {
  return (await cookies()).get(REFRESH)?.value;
}
export async function getSessionRole(): Promise<SessionRole | undefined> {
  const v = (await cookies()).get(ROLE)?.value;
  return v === "admin" || v === "user" ? v : undefined;
}
export async function rotateAccess(accessToken: string) {
  const jar = await cookies();
  jar.set(ACCESS, accessToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: accessMaxAge,
  });
}
export async function clearSession() {
  const jar = await cookies();
  jar.delete(ACCESS);
  jar.delete(REFRESH);
  jar.delete(ROLE);
}
