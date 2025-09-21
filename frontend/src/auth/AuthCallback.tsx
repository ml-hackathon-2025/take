import { useEffect } from "react";
import { oidc } from "../auth/oidc";
import { useNavigate } from "react-router";

export default function AuthCallback() {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        console.log("AuthCallback: Processing callback");
        console.log("AuthCallback: Current URL:", window.location.href);
        
        // Check if there's an error in the URL params
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        
        if (error) {
          console.error('OAuth error:', {
            error: urlParams.get('error'),
            error_description: urlParams.get('error_description')
          });
          nav("/", { replace: true });
          return;
        }
        
        // Handle the callback from Cognito
        console.log("AuthCallback: Calling signinRedirectCallback");
        const user = await oidc.signinRedirectCallback();
        console.log("AuthCallback: User received:", user);
        
        // Get the return path from state, or default to home
        const returnTo = (user.state as any)?.returnTo || "/";
        console.log("AuthCallback: Returning to:", returnTo);
        
        // Navigate to the intended destination
        nav(returnTo, { replace: true });
      } catch (e) {
        // If something goes wrong, go home
        console.error("Error handling sign-in callback", e);
        nav("/", { replace: true });
      }
    })();
  }, [nav]);

  return <div className="p-6">Signing you in…</div>;
}