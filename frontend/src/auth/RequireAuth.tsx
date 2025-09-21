import { useEffect, useState, useRef, type ReactNode } from "react";
import { login, getUser } from "./oidc";
import { useLocation } from "react-router";

export function RequireAuth({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState<"loading"|"ok"|"login">("loading");
  const loc = useLocation();
  const loginAttemptedRef = useRef(false);

  useEffect(() => {
    (async () => {
      console.log("RequireAuth: Checking user authentication");
      const u = await getUser();
      
      if (u && !u.expired) {
        setReady("ok");
        loginAttemptedRef.current = false; // Reset for future use
      } else {
        setReady("login");
      }
    })();
  }, [loc.key]); // re-check when route changes

  if (ready === "loading") return <div className="p-6">Loading…</div>;
  if (ready === "login") {
    if (!loginAttemptedRef.current) {
      console.log("RequireAuth: Attempting login");
      loginAttemptedRef.current = true;
      // Keep where we were going (path+query+hash)
      const where = loc.pathname + loc.search + loc.hash;
      login(where);
    }
    return null;
  }
  return children;
}
