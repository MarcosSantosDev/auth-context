import axios from 'axios'
import * as types from './types'

const clientApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const loadPosts = async (dispatch) => {
    dispatch({ type: types.POST_LOADING });

    const posts = await clientApi('posts');

    dispatch({
        type: types.POST_LOADED,
        payload: posts.data
    });
};
