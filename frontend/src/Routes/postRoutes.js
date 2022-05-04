import axios from "axios";

async function getPosts(userId) {
  console.log("http://localhost:3007/api/posts/" + userId);

  try {
    let response = await axios.get("http://localhost:3007/api/posts/" + userId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting posts: " + error);
  }
}

async function getAPost(postId) {
  console.log("http://localhost:3007/api/posts/" + postId);

  try {
    let response = await axios.get("http://localhost:3007/api/posts/" + postId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting posts: " + error);
  }
}

async function updatePosts(obj) {
  console.log(obj);
  try {
    let response = await axios.post("http://localhost:3007/api/posts/", obj);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding post: " + error);
  }
}

async function deletePost(postId) {
  try {
    let response = await axios.delete(
      "http://localhost:3007/api/posts/" + postId
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error deleting post: " + error);
  }
}

const AxiosPosts = { deletePost, updatePosts, getPosts, getAPost };
export default AxiosPosts;
