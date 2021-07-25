import * as types from './types';

const reducer = (state, action) => {
    switch (action.type) {
        case types.AUTH_LOADING:
            return {
                ...state,
                loading: true
            }

        case types.AUTH_SUCCESS:
            return {
                ...state,
                auth: {
                  ...state.auth,
                  isAuthenticated: false,
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
