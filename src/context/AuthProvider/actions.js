import Cookies from 'js-cookie';

import clientHttp from '../../services/clientHttp'
import * as types from './types'

import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_KEY,
  getNewDateWithAdditionalMinutes
} from '../../helpers/authFunctions'

const convertMillisecondstoMinutes = (ms) => {
  if (ms) {
    return Math.floor((ms/1000/60) << 0)
  }

  return 0
}


export const loginHandler = async (dispatch, data) => {
  try {
    dispatch({ type: types.AUTH_LOADING });

    const clientService = clientHttp()

    const response = await clientService.post('auth', { ...data });

    if (response.status) {
      const { user, token, refreshToken, expiresIn } = response.data
      
      const expiresMinutes = convertMillisecondstoMinutes(expiresIn)

      Cookies.set(TOKEN_KEY, token, {
        expires: getNewDateWithAdditionalMinutes(expiresMinutes)
      })
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        expires: 1
      })
      Cookies.set(USER_KEY, user)

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: user
      });
    }
  } catch (error) {
    console.error(error);
  }
};
