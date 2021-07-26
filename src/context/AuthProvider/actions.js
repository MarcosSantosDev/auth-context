import clientHttp from '../../services/clientHttp'

import * as types from './types'

import { saveRefreshToken, saveToken } from '../../helpers/authFunctions'

export const loginHandler = async (dispatch, data) => {
  try {
    dispatch({ type: types.AUTH_LOADING });

    const clientService = clientHttp();

    const response = await clientService.post('auth', { ...data });

    if (response.status) {
      const { user, token, refreshToken } = response.data;
      
      saveToken(token);
      saveRefreshToken(refreshToken);

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: user
      });
    }
  } catch (error) {
    console.error(error);
  }
};
