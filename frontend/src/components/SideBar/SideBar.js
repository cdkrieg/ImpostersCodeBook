import React, { useState, useEffect, useContext } from "react";
import AxiosOnlineStatus from "../../Routes/status";
import AxiosFriends from "../../Routes/friendsRoutes";
import AxiosUsers from "../../Routes/userRoutes";
import AuthContext from "../../context/AuthContext";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [friendList, setFriendList] = useState();
  const [pendingFriends, SetPendingFriends] = useState();
  const [friendRequests, setFriendRequests] = useState();
  const [online, setOnline] = useState();

  useEffect(() => {
    if (user) {
      getOnlineUsers();
      getFriends();
      getFriendRequests();
      getPendingFriends();
    }
  }, [user]);

  async function getOnlineUsers() {
    try {
      let onlineUsers = await AxiosOnlineStatus.onlineUser();
      if (onlineUsers) setOnline(onlineUsers);
      else
        console.log("Error getting list of online users, return was undefined");
    } catch (error) {
      console.log("Error getting list of online users: " + error);
    }
  }
  async function getFriends() {
    try {
      let tempFriendsList = await AxiosFriends.getAllFriends(user._id);
      if (tempFriendsList) setFriendList(tempFriendsList);
    } catch (error) {
      console.log("Error getting friends list: " + error);
    }
  }
  async function getFriendRequests() {
    try {
      let tempFriendRequests = await AxiosFriends.getAllFriendRequests(
        user._id
      );
      if (tempFriendRequests) setFriendRequests(tempFriendRequests);
      console.log(tempFriendRequests);
    } catch (error) {
      console.log("Error getting friend requests: " + error);
    }
  }
  async function getPendingFriends() {
    try {
      let tempPendingFriends = await AxiosFriends.getAllPendingFriends(
        user._id
      );
      if (tempPendingFriends) SetPendingFriends(tempPendingFriends);
      console.log(tempPendingFriends);
    } catch (error) {
      console.log("Error getting pending friends: " + error);
    }
  }

  return (
    <div className='container-0'>
      {user && <h4>{user.name}</h4>}
      {user && <h5>{online && online.length} Users online</h5>}
      {user && (
        <h5>
          Friends ({(Array.isArray(friendList) && friendList.length) || "0"})
        </h5>
      )}
      {user && (
        <h5>
          Pending Friends (
          {(Array.isArray(pendingFriends) && pendingFriends.length) || "0"})
        </h5>
      )}
      {user && (
        <h5>
          Friend Requsts (
          {(Array.isArray(friendRequests) && friendRequests.length) || "0"})
        </h5>
      )}
    </div>
  );
};

export default SideBar;
