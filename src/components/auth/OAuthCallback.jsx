import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socialLogin } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/auth/authContext";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveTokens } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        console.error("Google OAuth Error:", error);
        navigate("/login", { state: { error: "Google login failed" } });
        return;
      }

      if (!code) {
        console.error("No authorization code provided");
        navigate("/login", {
          state: { error: "No authorization code provided" },
        });
        return;
      }

      try {
        console.log("Sending code to socialLogin:", code);
        const response = await socialLogin(code, "google");
        console.log("Full API Response:", response);
        console.log("Response Data:", response.data);

        if (!response.data) {
          throw new Error("Empty response data from socialLogin API");
        }

        const { access, refresh, user: userData } = response.data;
        if (!access || !refresh) {
          throw new Error("Missing access or refresh token in response");
        }

        console.log("Saving tokens:", { access, refresh });
        saveTokens({ access, refresh });

        console.log("Decoding access token:", access);
        const decodedToken = jwtDecode(access);
        console.log("Decoded Token:", decodedToken);

        const user = {
          id: decodedToken.user_id || null,
          first_name:
            decodedToken.first_name ||
            decodedToken.username ||
            userData.first_name ||
            "Unknown",
          role: decodedToken.role || userData.role || "user",
          avatar:
            decodedToken.image ||
            userData.image ||
            "https://via.placeholder.com/30",
          email: decodedToken.email || userData.email || "",
        };
        console.log("Saving user to localStorage:", user);
        localStorage.setItem("user", JSON.stringify(user));

        if (decodedToken.role === "admin") {
          console.log("Navigating to /admin");
          navigate("/admin", { replace: true });
        } else {
          console.log("Navigating to /");
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("OAuthCallback Error:", err);
        navigate("/login", {
          state: {
            error:
              err.message ||
              err.response?.data?.detail ||
              "Google login failed",
          },
        });
      }
    };

    handleCallback();
  }, [searchParams, navigate, saveTokens]);

  return (
    <div className="flex flex-1 flex-col w-full overflow-x-hidden items-center min-h-screen pt-10 bg-gradient-to-b from-[#272727] to-[#131313]">
      <div className="bg-[#121212] w-full max-w-[734px] flex flex-col items-center justify-center rounded-lg px-10 py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-t-[#1ed760] border-[#b3b3b3] rounded-full animate-spin"></div>
          </div>
          <span className="text-white text-lg font-medium animate-pulse">
            Đang xử lý...
          </span>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default OAuthCallback;
