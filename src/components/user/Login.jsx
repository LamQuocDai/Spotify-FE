import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/auth/authContext";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { saveTokens, setUser } = useAuth();

  useEffect(() => {
    if (location.state?.error) {
      setErrors((prev) => ({ ...prev, general: location.state.error }));
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = { username: "", password: "", general: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống.";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({ username: "", password: "", general: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(username, password);
      console.log("Đăng nhập thành công:", res);

      const { access, refresh } = res.data;

      // Lưu token
      saveTokens({ access, refresh });

      // Giải mã token
      const decodedToken = jwtDecode(access);
      console.log("Token giải mã:", decodedToken);

      if (!decodedToken.user_id) {
        console.error("Không tìm thấy user_id trong token JWT");
        throw new Error("Token JWT không hợp lệ: thiếu user_id");
      }

      const user = {
        id: decodedToken.user_id,
        first_name: decodedToken.first_name || username,
        role: decodedToken.role || "user",
        avatar: decodedToken.avatar || "https://via.placeholder.com/30",
        email: decodedToken.email || "",
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      if (decodedToken.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);

      const newErrors = { username: "", password: "", general: "" };

      if (err.response?.data) {
        if (
          err.response.data.detail ===
          "No active account found with the given credentials"
        ) {
          newErrors.general = "Tên đăng nhập hoặc mật khẩu không đúng.";
        } else {
          newErrors.general =
            err.response.data.detail || "Đăng nhập thất bại. Vui lòng thử lại.";
        }
      } else {
        newErrors.general =
          err.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      }

      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (window.googleLoginInProgress) return;
    window.googleLoginInProgress = true;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = "email profile";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&prompt=select_account`;
    window.location.href = url;
    setTimeout(() => {
      window.googleLoginInProgress = false;
    }, 2000);
  };

  return (
    <div className="flex flex-1 flex-col w-full overflow-x-hidden items-center min-h-screen pt-10 bg-gradient-to-b from-[#272727] to-[#131313]">
      <div className="bg-[#121212] w-full max-w-[734px] flex flex-col items-center justify-center rounded-lg px-10 py-10">
        <div className="mb-4">
          <svg viewBox="0 0 1134 340" className="h-[35px]"></svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          Đăng nhập vào Spotify
        </h1>

        {errors.general && (
          <div className="text-red-500 text-center mb-4 px-4 py-2 bg-red-50 rounded-md border border-red-200">
            {errors.general}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-[330px] flex items-center justify-left gap-2 bg-transparent text-white border border-gray-500 rounded-full py-2 px-8 font-medium hover:border-white transition-colors"
          >
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png"
              alt="Google"
              className="mr-6 w-6 h-6"
            />
            Tiếp tục bằng Google
          </button>
        </div>

        <div className="my-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#121212] text-gray-400">hoặc</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2 justify-center">
            <label className="block text-white">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-[330px] p-3 bg-[#242424] text-white rounded-[4px] border ${
                errors.username ? "border-red-500" : "border-gray-500"
              } focus:border-white focus:outline-none`}
              placeholder="Tên đăng nhập"
              required
            />
            {errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
            <label className="block text-white">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[330px] p-3 bg-[#242424] text-white rounded-[4px] border ${
                errors.password ? "border-red-500" : "border-gray-500"
              } focus:border-white focus:outline-none`}
              placeholder="Mật khẩu"
              required
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-green-700" : "bg-[#1ed760] hover:scale-105"
            } text-black font-bold py-3 px-8 rounded-full transition-transform flex justify-center items-center`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-black"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Đăng ký Spotify
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
