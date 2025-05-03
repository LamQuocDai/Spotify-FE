import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { socialLogin } from "../../services/authenticateService";

const OAuthCallback = () => {
  const location = useLocation();
  const isProcessed = useRef(false);

  useEffect(() => {
    console.log("OAuthCallback useEffect triggered");
    const handleCallback = async () => {
      if (isProcessed.current) {
        console.log("Request already processed, skipping...");
        return;
      }
      isProcessed.current = true;
      console.log("Processing new social login request");

      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const provider = params.get("provider") || "google";
      const state = params.get("state");

      console.log("OAuth Callback:", { code, provider, state, url: location.search });

      if (!code) {
        console.error("Missing authorization code in callback URL");
        console.log("Redirecting to /login due to missing code...");
        window.location.replace("/login?error=invalid_auth");
        return;
      }

      try {
        console.log("Calling socialLogin with code:", code?.slice(0, 10) + "...");
        const response = await socialLogin(code, provider);
        console.log("Backend Response:", JSON.stringify(response, null, 2));

        // Validate response
        const { user, access, refresh } = response;
        if (!user || !access || !refresh) {
          throw new Error(`Invalid response: Missing ${!user ? 'user' : !access ? 'access' : 'refresh'} field`);
        }

        // Store tokens and user data (match Login.jsx logic)
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        const userInfo = {
          first_name: user.first_name || user.username || "User",
          avatar: user.image || null,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));

        console.log("Stored in localStorage:", {
          access_token: access.slice(0, 10) + "...",
          refresh_token: refresh.slice(0, 10) + "...",
          user: userInfo,
        });

        // Immediate redirect to homepage
        console.log("Redirecting to homepage with window.location.replace...");
        window.location.replace("/");
      } catch (error) {
        console.error("Error during social login:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        console.log("Redirecting to /login due to error...");
        window.location.replace("/login?error=login_failed");
      }
    };

    handleCallback();
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white">
      <div className="w-12 h-12 border-4 border-t-[#1ed760] border-gray-500 rounded-full animate-spin"></div>
      <p className="mt-4">Đang xử lý đăng nhập...</p>
    </div>
  );
};

export default OAuthCallback;