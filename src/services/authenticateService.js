import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
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

export const socialLogin = async (code, provider) => {
  console.log(`Attempting ${provider} login with code: ${code.substring(0, 10)}...`);

  try {
    const response = await apiClient.post("/users/social-login/", {
      code,
      provider,
    });

    console.log(`${provider} login successful:`, {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers
          ? { ...error.config.headers, Authorization: "[REDACTED]" }
          : undefined,
        data: error.config?.data,
      },
    };
    console.error(`${provider} login error:`, errorDetails);

    throw error.response?.data || {
      detail: `Đăng nhập ${provider} thất bại.`,
    };
  }
};

export default apiClient;