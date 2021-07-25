import clientHttp from '../../services/clientHttp'
import * as types from './types'

const clientApi = clientHttp('https://jsonplaceholder.typicode.com');

export const loadPosts = async (dispatch) => {
    dispatch({ type: types.POST_LOADING });

    const posts = await clientApi('posts');

    dispatch({
        type: types.POST_LOADED,
        payload: posts.data
    });
};
