const TOKEN_KEY = "naamevent_admin_token";

export function setAdminToken(token: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=43200; SameSite=Lax`;
}

export function clearAdminToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function getAdminToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
}

export const adminTokenCookieName = TOKEN_KEY;

