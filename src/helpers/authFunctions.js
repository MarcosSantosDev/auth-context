import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token';
export const REFRESH_TOKEN_KEY = 'refresh-token';
export const USER_KEY = 'user';
export const isAuthenticated = () => Boolean(Cookies.get(TOKEN_KEY));
export const getNewDateWithAdditionalMinutes = (minutes = 0) => {
  return new Date(new Date().getTime() + minutes * 60 * 1000);
}