import * as types from './types';

const reducer = (state, action) => {
    switch (action.type) {
        case types.POST_LOADING:
            return {
                ...state,
                loading: true
            }

        case types.POST_LOADED:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
                
        default:
            return state
    }
};

export default reducer;
