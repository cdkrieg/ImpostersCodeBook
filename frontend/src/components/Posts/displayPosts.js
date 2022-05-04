import React from "react";

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
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPosts;
