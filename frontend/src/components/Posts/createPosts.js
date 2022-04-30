import React, { useState } from "react";
import { handleInputChange, handleSubmit } from "../../hooks/useCustomForm";
import { updatePosts } from "../../Routes/postRoutes";

const CreatePost = ({ post, setPost, postList }) => {
  function handlePost(event) {
    event.preventDefault();
    let newPost = {
      body: post,
      like: false,
    };
    createNewPost(newPost);
  }
  async function createNewPost(userId, obj) {
    let post = await updatePosts(userId, obj);
    console.log(post.body);
  }

  return (
    <form onSubmit={handlePost}>
      <label>Post</label>
      <div>
        <textarea
          type="text"
          value={post}
          onChange={(event) => setPost(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handlePost;
            }
          }}
        />
        <button type="submit">Post</button>
      </div>
    </form>
  );
};
export default CreatePost;
