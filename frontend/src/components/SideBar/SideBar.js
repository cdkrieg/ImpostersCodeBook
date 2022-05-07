import React, { useState, useEffect, useContext } from "react";
import AxiosOnlineStatus from "../../Routes/status";
import AxiosFriends from "../../Routes/friendsRoutes";
import AxiosUsers from "../../Routes/userRoutes";
import AuthContext from "../../context/AuthContext";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
} from "cdbreact";

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

  if (user)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "-32px"
        }}>
        <CDBSidebar textColor='#fff' backgroundColor='rgb(51, 59, 65)'>
          <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
            <a
              href='/'
              className='text-decoration-none'
              style={{ color: "inherit" }}>
              <img
                src='https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
                alt='default'
                style={{ width: "150px", height: "auto" }}
              />
              <h4 style={{textAlign: 'center'}}>{user.name}</h4>
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenuItem icon='user'>
            {online && online.length} Users online
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon='user'>
            Friends ({(Array.isArray(friendList) && friendList.length) || "0"})
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon='user'>
            Pending Friends (
            {(Array.isArray(pendingFriends) && pendingFriends.length) || "0"})
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon='user'>
            Friend Requests (
            {(Array.isArray(friendRequests) && friendRequests.length) || "0"})
          </CDBSidebarMenuItem>
        </CDBSidebar>
      </div>
    );
    else return <div></div>
};

export default SideBar;
