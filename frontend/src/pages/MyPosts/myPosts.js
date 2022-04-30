import React, { useEffect } from "react";
import CreatePost from "../../components/Posts/createPosts";
import DisplayPosts from "../../components/Posts/displayPosts";
import AxiosPosts, { getAllPosts } from "../../Routes/postRoutes";
import { user } from "../../context/AuthContext";

const myPosts = () => {
  const [postList, setPostList] = useState({});
  const [post, setPost] = useState("");



  useEffect(() => {
    getPosts(user._id);
  }, [postList]);

  async function getPosts(userId) {
    let posts = await getAllPosts(userId);
    if (Object.keys(posts).length !== 0) {
      setPostList(posts);
    } else setPostList({ Object: "No Posts" });
  }

  return (
    <div>
      <CreatePost
        post={post}
        setPostList={setPostList}
        postList={postList}
      />
      <DisplayPosts postList={postList} />
    </div>
  );
};

export default myPosts;
