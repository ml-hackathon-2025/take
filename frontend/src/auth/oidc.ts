import { UserManager, WebStorageStateStore, User } from "oidc-client-ts";

const user_pool_id = import.meta.env.VITE_COGNITO_ID as string;
const client_id = import.meta.env.VITE_COGNITO_CLIENT_ID as string;
const client_secret = import.meta.env.VITE_COGNITO_CLIENT_SECRET as string;
const redirect_uri = window.location.origin + "/auth/callback"
const post_logout_redirect_uri = window.location.origin + "/";
const authority = `https://cognito-idp.us-east-1.amazonaws.com/${user_pool_id}`

export const oidc = new UserManager({
  authority,
  client_id,
  client_secret,
  redirect_uri,
  post_logout_redirect_uri,
  response_type: "code",             // Authorization Code + PKCE (PKCE auto)
  scope: "openid email phone",
  // Keep tokens out of localStorage; session survives tab refresh but not full browser restart
  userStore: new WebStorageStateStore({ store: sessionStorage }),
  // Cognito blocks iframes, so silent renew won't work; re-login on expiry instead
  automaticSilentRenew: false,
  monitorSession: false,
});

// Kick off login; preserve the path so we can return after callback
export async function login(currentPath: string = "/") {
  await oidc.signinRedirect({ state: { returnTo: currentPath } });
}

export async function logout() {
  await oidc.signoutRedirect(); // sends to Hosted UI logout, then back to post_logout_redirect_uri
}

export async function getUser(): Promise<User | null> {
  return oidc.getUser();
}

export async function getAccessToken(): Promise<string | null> {
  const u = await getUser();
  if (!u) return null;
  // If expired, treat as logged out (we’ll re-login on 401)
  if (u.expired) return null;
  return u.access_token!;
}
