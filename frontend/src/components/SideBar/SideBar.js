import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosOnlineStatus from "../../Routes/status";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [online, setOnline] = useState();
  const [onlineFriends, setOnlineFriends] = useState();
  const [onlinePendingFriends, setOnlinePendingFriends] = useState();
  const [onlineFriendRequests, setOnlineFriendRequests] = useState();

  useEffect(() => {
    if (user) {
      getOnlineUsers();
    }
  }, []);

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
  function loadData() {
    setTimeout(() => {
      if (Array.isArray(user.friendsList)) {
        if (Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.friendsList.includes(userId)
          );
          setOnlineFriends(tempUsers);
        }
      }
      if (Array.isArray(user.pendingFriends)) {
        if (Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.pendingFriends.includes(userId)
          );
          setOnlinePendingFriends(tempUsers);
        }
      }
      if (Array.isArray(user.friendRequests)) {
        if (Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.friendRequests.includes(userId)
          );
          setOnlineFriendRequests(tempUsers);
        }
      }
    }, 300);
  }
  loadData();
  if (user)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "-32px",
          position: "absolute",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="rgb(51, 59, 65)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <img
                src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
                alt="default"
                style={{ width: "130px", height: "auto" }}
              />
              <h4 style={{ textAlign: "center" }}>{user.name}</h4>
            </a>
          </CDBSidebarHeader>

          <CDBSidebarMenuItem icon="user">
            {online && online.length} Users online
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon="user">
            Friends ({(onlineFriends && onlineFriends.length) || "0"})
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon="user">
            Pending Friends (
            {(onlinePendingFriends && onlinePendingFriends.length) || "0"})
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user">
            Friend Requests (
            {(onlineFriendRequests && onlineFriendRequests.length) || "0"})
          </CDBSidebarMenuItem>
        </CDBSidebar>
      </div>
    );
  else return <div></div>;
};

export default SideBar;
