import React, { useState } from "react";
import { handleInputChange, handleSubmit } from "../../hooks/useCustomForm";
import AxiosPosts from "../../Routes/postRoutes";

const CreatePost = ({ post, setPost, postList, userId, handleClick }) => {
  const [value, setValue] = useState("");

  function handlePost(event) {
    event.preventDefault();

    let newPost = {
      body: value,
      userId: userId,
    };
    createNewPost(newPost);
    setValue("");
    let click = () => {
      handleClick();
    };
    click();
  }
  async function createNewPost(obj) {
    await AxiosPosts.updatePosts(obj);
    return obj;
  }

  return (
    <form onSubmit={handlePost}>
      <label>Post</label>
      <div>
        <textarea
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handlePost();
            }
          }}
        />
        <button type="submit">Post</button>
        <button
          type="button"
          onClick={() => {
            handleClick();
          }}
        >
          Reload
        </button>
      </div>
    </form>
  );
};
export default CreatePost;
