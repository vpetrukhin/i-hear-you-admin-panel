const TOKEN_STORAGE_KEY = "tokеen";

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const saveToken = (newToken: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
