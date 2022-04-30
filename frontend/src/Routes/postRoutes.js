import axios from "axios";

async function getPosts(userId) {
  try {
    let response = await axios.get("http://localhost:3007/api/posts/" + userId);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error getting posts: " + error);
  }
}

async function updatePosts(userId, obj) {
  try {
    let response = await axios.post(
      "http://localhost:3007/api/posts/" + userId,
      obj
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error adding post: " + error);
  }
}

async function deletePost(postId) {
  try {
    let response = await axios.delete("http://localhost:3007/api/posts/", {
      params: { postId: postId },
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error deleting post: " + error);
  }
}

const AxiosPosts = { deletePost, updatePosts, getPosts };
export default AxiosPosts;
