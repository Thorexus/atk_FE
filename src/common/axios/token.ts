import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/token';

export type TokenProps = {
  access_token: string | null;
  refresh_token: string | null;
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveAccessToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const saveRefreshToken = (token: string) => {
  return localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeToken = () => {
  const keysToRemove = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY];

  return keysToRemove.forEach(key => localStorage.removeItem(key));
};
