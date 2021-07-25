
import React from 'react'

import PostsProvider from '../../../context/PostsProvider'

import Posts from "../../../pages/Posts";

function PostWrapper() {
  return <PostsProvider><Posts /></PostsProvider>;
}

export default PostWrapper;
