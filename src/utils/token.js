export const saveTokens = (data) => {
  localStorage.setItem("access_token", JSON.stringify(data.access));
  localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
};

export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("access_token"));
};

export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem("refresh_token"));
};

export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};