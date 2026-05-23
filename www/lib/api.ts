import "server-only";
import { clearSession, getAccessToken, getRefreshToken, setSession, type SessionRole } from "./session";

const BASE = process.env.BACKEND_API_URL ?? "http://localhost:8080";
const VIEW_PUBLIC_URL = process.env.VIEW_PUBLIC_URL ?? "http://localhost:3000";

export class ApiException extends Error {
  status: number;
  code: string;
  details?: unknown;
  constructor(opts: { status: number; code: string; message: string; details?: unknown }) {
    super(opts.message);
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
  }
}

type FetchOpts = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  retryOn401?: boolean;
};

async function rawFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { method = "GET", body, headers = {}, auth = true } = opts;
  const reqHeaders: Record<string, string> = { Accept: "application/json", ...headers };
  if (body !== undefined) reqHeaders["Content-Type"] = "application/json";
  if (auth) {
    const tok = await getAccessToken();
    if (tok) reqHeaders.Authorization = `Bearer ${tok}`;
  }
  const res = await fetch(`${BASE}/api/v1${path}`, {
    method,
    headers: reqHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  const json = text ? safeJson(text) : undefined;
  if (!res.ok) {
    const errObj = (json as { error?: { code?: string; message?: string; details?: unknown } } | undefined)?.error;
    throw new ApiException({
      status: res.status,
      code: errObj?.code ?? "http_" + res.status,
      message: errObj?.message ?? `HTTP ${res.status}`,
      details: errObj?.details,
    });
  }
  return (json as { data?: T })?.data as T;
}

function safeJson(text: string): unknown {
  try { return JSON.parse(text); } catch { return undefined; }
}

export async function api<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const retryOn401 = opts.retryOn401 ?? true;
  try {
    return await rawFetch<T>(path, opts);
  } catch (err) {
    if (retryOn401 && err instanceof ApiException && err.status === 401 && (opts.auth ?? true)) {
      if (await tryRefresh()) {
        return await rawFetch<T>(path, { ...opts, retryOn401: false });
      }
      await clearSession();
    }
    throw err;
  }
}

async function tryRefresh(): Promise<boolean> {
  const refresh = await getRefreshToken();
  if (!refresh) return false;
  try {
    const data = await rawFetch<{ access_token: string; refresh_token: string; user: { role: SessionRole } }>(
      "/auth/refresh",
      { method: "POST", body: { refresh_token: refresh }, auth: false, retryOn401: false },
    );
    await setSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      role: data.user.role,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the full envelope (data + pagination) for paginated endpoints.
 */
export async function apiRaw<T>(path: string, opts: { auth?: boolean } = {}): Promise<T> {
  const { auth = false } = opts;
  const headers: Record<string, string> = {};
  if (auth) {
    const tok = await getAccessToken();
    if (tok) headers.Authorization = `Bearer ${tok}`;
  }
  const res = await fetch(`${BASE}/api/v1${path}`, { headers, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new ApiException({
      status: res.status, code: "http_" + res.status, message: text || `HTTP ${res.status}`,
    });
  }
  return (await res.json()) as T;
}

// ---------- Auth helpers ----------

export type Me = {
  id: string;
  email: string;
  role: SessionRole;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  language: string;
  status: string;
};

export type VerifyResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: Me;
};

export const auth = {
  requestMagicLink(email: string) {
    return rawFetch<void>("/auth/magic-link", {
      method: "POST",
      body: { email, callback_url: VIEW_PUBLIC_URL },
      auth: false,
    });
  },
  verify(token: string) {
    return rawFetch<VerifyResponse>("/auth/verify", {
      method: "POST", body: { token }, auth: false,
    });
  },
  logout(refreshToken: string) {
    return rawFetch<void>("/auth/logout", {
      method: "POST", body: { refresh_token: refreshToken }, auth: false,
    });
  },
  me() {
    return api<Me>("/auth/me");
  },
};
