export const saveToken = (data) => {
  localStorage.setItem("access_token", JSON.stringify(data));
};

export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("access_token"));
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};
