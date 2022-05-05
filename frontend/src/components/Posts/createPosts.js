import React, { useState } from "react";
import AxiosPosts from "../../Routes/postRoutes";

const CreatePost = ({ userId, handleClick, name }) => {
  const [value, setValue] = useState("");

  function handlePost(event) {
    event.preventDefault();

    let newPost = {
      body: value,
      userId: userId,
      name: name,
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
              handlePost(event);
            }
          }}
        />
        <button type="submit">Post</button>
      </div>
    </form>
  );
};
export default CreatePost;
