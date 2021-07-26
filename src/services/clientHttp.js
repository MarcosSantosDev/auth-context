import axios from 'axios';

import {
  isAuthenticated,
  getRefreshToken,
  getToken,
  saveToken,
  saveRefreshToken
} from '../helpers/authFunctions'

const refreshToken = async () => {
  try {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      responseType: 'json',
      timeout: 10000
    });

    const refreshTokenValue = getRefreshToken()

    const configuration = {
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshTokenValue,
      }
    }

    const response = await axiosInstance.post('refresh', configuration.data);

    if (response) {
      const responseData = response.data;
  
      saveToken(responseData.token);
      saveRefreshToken(responseData.refreshToken);
    }

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error)
  }
}

const handleTokenLifecycle = async () => {
  const refreshTokenValue = getRefreshToken();

  if (!isAuthenticated() && refreshTokenValue) {
    await refreshToken();
  }
}

const clientHttp = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: 'json',
    timeout: 10000
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const configuration = config;

    if (isAuthenticated()) {
      configuration.headers = {
        Authorization: `Bearer ${getToken()}`,
      };
    }

    await handleTokenLifecycle();

    return Promise.resolve(config);
  },
  (error) => Promise.reject(error));

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  return axiosInstance;
}

export default clientHttp;