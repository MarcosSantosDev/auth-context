import axios from 'axios';
import Cookies from 'js-cookie';

import { isAuthenticated, TOKEN_KEY } from '../helpers/authFunctions';

const clientHttp = (
  baseURL = process.env.REACT_APP_API_BASE_URL,
  responseType = 'json',
  ...configAxios
) => {
  const instance = axios.create({
    baseURL,
    responseType,
    timeout: 5000,
    ...configAxios
  });

  const rejectPromise = (error) => Promise.reject(error);

  instance.interceptors.request.use((config) => {
    const configuration = config;

    if (isAuthenticated()) {
      configuration.headers = {
        Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`,
      };
    }

    return Promise.resolve(config);
  }, rejectPromise);


  instance.interceptors.response.use((config) => config, rejectPromise);

  return instance;
}

export default clientHttp;