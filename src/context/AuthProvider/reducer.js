import * as types from './types';
import { isAuthenticated } from '../../helpers/authFunctions'

const reducer = (state, action) => {
    switch (action.type) {
        case types.AUTH_LOADING:
          console.log('bbbbbbbbbbbbb');
          return {
                ...state,
                loading: true
            }

        case types.AUTH_SUCCESS:
          console.log('aaaaaaaaaaaaaaaaaaaaa');
            return {
                ...state,
                auth: {
                  ...state.auth,
                  isAuthenticated: isAuthenticated(),
                  data: {
                  ...state.auth.data,
                    user: action.payload
                  }
                },
                loading: false
            }
                
        default:
            return state
    }
};

export default reducer;
