import React from "react";
import AxiosPosts from "../../Routes/postRoutes";

const DisplaySinglePost = ({ singlePost, setHidden, handleClick, userId }) => {
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
      {singlePost && singlePost.name} <br />
      {singlePost.body}
      {console.log(singlePost.name)}
      <button
        onClick={() => {
          if (singlePost.userId === userId) {
            deleteAPost(singlePost._id);
          } else alert("Not authorized to delete post");
        }}
      >
        Delete Post
      </button>
    </div>
  );
};

export default DisplaySinglePost;
