import jwt from 'jwt-decode';

export const TOKEN_KEY = '@token';
export const REFRESH_TOKEN_KEY = '@refresh-token';

export const isExpiredToken = () => {
  const token = getToken()
  const refreshToken = getRefreshToken()

  if (refreshToken) {
    if (token) {
      const decoded = jwt(token);
    
      const expiration = +decoded.exp;
      
      if (isNaN(expiration)) {
        return true
      }

      const isExpired = Date.now() > (expiration * 1000)

      return isExpired
    }
  }

  return true;
}

export const isAuthenticated = () => {
  const isExpired = isExpiredToken()

  if (isExpired) {
    return false
  }
  return true
};

export const saveToken = (token) => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.setItem(TOKEN_KEY, token)
}

export const saveRefreshToken = (refreshToken) => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}
