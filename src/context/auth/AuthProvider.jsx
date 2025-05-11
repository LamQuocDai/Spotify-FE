import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import {
  saveTokens as saveTokensUtil,
  removeTokens as removeTokensUtil,
  getAccessToken,
} from "../../utils/token";
import { getUserService } from "../../services/UserService";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = getAccessToken();
    return storedToken || null;
  });

  const [user, setUser] = useState(() => {
    // Khôi phục user từ localStorage khi khởi động
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Hàm lấy thông tin user từ API
  const fetchUser = async (userId) => {
    try {
      const res = await getUserService(userId);
      if (res.status === 200) {
        const userData = res.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // Nếu lỗi (ví dụ: token hết hạn), xóa token và user
      removeTokens();
    }
  };

  // Kiểm tra và khôi phục trạng thái khi khởi động hoặc token thay đổi
  useEffect(() => {
    if (token && !user) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        if (userId) {
          fetchUser(userId);
        } else {
          console.error("Invalid token: missing user_id");
          removeTokens();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        removeTokens();
      }
    }
  }, [token]);

  // Hàm lưu token và kích hoạt lấy thông tin user
  const saveTokens = (data) => {
    setToken(data.access);
    saveTokensUtil(data);
    try {
      const decodedToken = jwtDecode(data.access);
      const userId = decodedToken.user_id;
      if (userId) {
        fetchUser(userId);
      }
    } catch (error) {
      console.error("Error decoding new token:", error);
    }
  };

  const removeTokens = () => {
    setUser(null);
    setToken(null);
    removeTokensUtil();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, saveTokens, removeTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
