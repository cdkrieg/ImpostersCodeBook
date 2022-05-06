import "../Posts/MyPost.css";

import CustomButton from "./likeButton";
import React from "react";

const DisplayPosts = ({ postList, setHidden, setSinglePost }) => {
  function handleClick() {
    setHidden(true);
  }

  return (

    <div className="postlist">
      {postList
        .map((post, index) => {
          return (
            <div key={index} className="postbody">
              <button
                className="postbodies"

                onClick={() => {
                  handleClick(post);
                  setSinglePost(post);
                }}
              >

                {post.name} <br />
                {post.body}
              </button>

              <CustomButton post={post} />
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default DisplayPosts;
