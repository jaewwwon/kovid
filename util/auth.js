export const getAuthToken = () => {
  if (process.browser) return JSON.parse(sessionStorage.getItem("authToken"));
};

export const setAuthToken = (token) => {
  sessionStorage.setItem("authToken", JSON.stringify(token));
};

export const removeAuthToken = () => {
  sessionStorage.removeItem("authToken");
};
