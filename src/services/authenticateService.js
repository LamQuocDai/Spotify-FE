import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/jwt/token/refresh/",
          {
            refresh: refresh,
          }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Hàm đăng nhập
export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post("/users/login/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        detail: "Đăng nhập thất bại. Vui lòng thử lại.",
      }
    );
  }
};

export const registerUser = async (
  username,
  email,
  password,
  password2,
  phone,
  gender,
  first_name,
  last_name
) => {
  try {
    const response = await apiClient.post("/users/register/", {
      username,
      email,
      password,
      password2,
      phone,
      gender,
      first_name,
      last_name,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { detail: "Đăng ký thất bại. Vui lòng thử lại." }
    );
  }
};



export default apiClient;
