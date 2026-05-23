import "server-only";
import { ApiException, auth, type Me } from "./api";
import { clearSession, getAccessToken } from "./session";

/** Returns the current user (any role) or null. Does NOT redirect. */
export async function getCurrentUser(): Promise<Me | null> {
  const tok = await getAccessToken();
  if (!tok) return null;
  try {
    return await auth.me();
  } catch (err) {
    if (err instanceof ApiException && (err.status === 401 || err.status === 403)) {
      await clearSession();
      return null;
    }
    throw err;
  }
}
