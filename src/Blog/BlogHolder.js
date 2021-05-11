import React from "react";
import Blog from "./Blog";
import PostBlog from "./PostBlog";

const BlogHolder = () => {
  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <PostBlog />
      <Blog />
    </div>
  );
};

export default BlogHolder;
