import axios from "axios";

const baseUrl = "http://localhost:3007/api/users";

async function updateUser(userId, body) {
    try {
      console.log(`${baseUrl}/update,  ${body.aboutMe}`)
      let response = await axios.put(`${baseUrl}/update`, {id: userId, body:{aboutMe: body.aboutMe}});
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error updating user: " + error);
    }
  }

  export default updateUser;