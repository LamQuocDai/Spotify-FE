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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const res = await getUserService(decodedToken.id);
        if (res.success) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const saveTokens = (data) => {
    setToken(data.access);
    saveTokensUtil(data);
  };

  const removeTokens = () => {
    setUser(null);
    setToken(null);
    removeTokensUtil();
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
