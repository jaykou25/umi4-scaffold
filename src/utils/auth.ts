import ls from "./localStorage";

const key = "umi4-token";

export const getToken = () => {
  return ls.get(key);
};

export const setToken = (token: string) => {
  ls.set(key, token);
};

export const clearToken = () => {
  ls.remove(key);
};

export const isLogin = () => {
  return !!getToken();
};
