import { useReducer } from 'react';

import data from './data'
import reducer from './reducer'
import { PostContext } from './context'

const PostsProvider = ({ children }) => {
    const [postsState, dispatchPostsState] = useReducer(reducer, data);

    return (
        <PostContext.Provider value={{ postsState, dispatchPostsState }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostsProvider;
