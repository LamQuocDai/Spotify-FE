export const saveTokens = (data) => {
  localStorage.setItem("access_token", data.access); // Lưu chuỗi trực tiếp
  localStorage.setItem("refresh_token", data.refresh); // Lưu chuỗi trực tiếp
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token"); // Lấy chuỗi trực tiếp
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token"); // Lấy chuỗi trực tiếp
};
export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
