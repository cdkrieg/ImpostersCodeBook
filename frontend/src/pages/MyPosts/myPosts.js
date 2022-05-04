import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/Posts/createPosts";
import DisplayPosts from "../../components/Posts/displayPosts";
import AxiosPosts from "../../Routes/postRoutes";
import AuthContext from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import DisplaySinglePost from "../../components/Posts/displaySinglePost";

const MyPosts = () => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user._id || null;
  const [update, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [singlePost, setSinglePost] = useState();

  useEffect(() => {
    getPosts(userId);
  }, [update]);

  function handleClick() {
    setUpdate(!update);
  }

  async function getPosts(userId) {
    let posts = await AxiosPosts.getPosts(userId);
    if (posts) {
      setPostList(posts);
    } else setPostList({ Object: "No Posts" });
  }

  return (
    <div>
      {hidden === false && (
        <div>
          <CreatePost
            post={post}
            setPost={setPost}
            setPostList={setPostList}
            postList={postList}
            userId={userId}
            handleClick={handleClick}
          />
          <ErrorBoundary>
            <DisplayPosts
              postList={postList}
              post={post}
              hidden={hidden}
              setHidden={setHidden}
              setSinglePost={setSinglePost}
              singlePost={singlePost}
            />
          </ErrorBoundary>
        </div>
      )}
      {hidden && (
        <DisplaySinglePost
          setSinglePost={setSinglePost}
          singlePost={singlePost}
          setHidden={setHidden}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default MyPosts;
