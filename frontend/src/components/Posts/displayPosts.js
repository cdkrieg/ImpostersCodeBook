import React from "react";
import CustomButton from "./likeButton";

const DisplayPosts = ({ postList, setHidden, setSinglePost }) => {
  function handleClick() {
    setHidden(true);
  }
  return (
    <div>
      {postList.map((post, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                handleClick(post);
                setSinglePost(post);
              }}
            >
              {post.body}
            </button>
            <CustomButton post={post}/>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPosts;
