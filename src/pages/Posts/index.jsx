import React, { useContext, useEffect } from "react";

import "./styles.css";
import Card from "../../components/Card";

import { ping } from "../../services";

import { PostContext } from "../../context/PostsProvider/context";
import { loadPosts } from "../../context/PostsProvider/actions";

const Posts = () => {
  const postContext = useContext(PostContext);
  const { posts } = postContext.postsState;

  useEffect(() => {
    loadPosts(postContext.dispatchPostsState);
  }, [postContext.dispatchPostsState]);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      ping();
    }, 10000);

    return () => {
      clearInterval(pingInterval)
    }
  }, []);
 
  return (
    <div className="posts-container">
      {posts.map(({ id, title, body }) => {
        return <Card key={id} id={id} title={title} description={body} />;
      })}
    </div>
  );
};

export default Posts;
