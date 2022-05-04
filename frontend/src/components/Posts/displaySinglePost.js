import React from "react";
import AxiosPosts from "../../Routes/postRoutes";

const DisplaySinglePost = ({ singlePost, setHidden, handleClick }) => {
  async function deleteAPost(postId) {
    await AxiosPosts.deletePost(postId);
    setHidden(false);
    let click = () => {
      handleClick();
    };
    click();
    return postId;
  }

  return (
    <div>
      {singlePost && singlePost.body}
      <button
        onClick={() => {
          deleteAPost(singlePost._id);
        }}
      >
        Delete Post
      </button>
    </div>
  );
};

export default DisplaySinglePost;
