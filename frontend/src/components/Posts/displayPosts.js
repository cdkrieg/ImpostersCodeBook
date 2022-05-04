import React from "react";
import AxiosPosts from "../../Routes/postRoutes";
import { Routes, Route } from "react-router-dom";

const DisplayPosts = ({ postList, setHidden, setSinglePost, singlePost }) => {
  function handleClick(post) {
    setHidden(true);

    console.log(post);
  }
  return (
    <div>
      {postList.map((post) => {
        return (
          <div>
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
