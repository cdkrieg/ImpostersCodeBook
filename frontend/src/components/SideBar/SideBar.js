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
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (user) {
      getOnlineUsers();
    }
    if(user.image !== ""){
      setPhoto(`http:localhost:3007/${user.image}`)
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
      if (user.friendsList !== null && Array.isArray(user.friendsList)) {
        if (online && Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.friendsList.includes(userId)
          );
          setOnlineFriends(tempUsers);
        }
      }
      if (user.pendingFriends !== null && Array.isArray(user.pendingFriends)) {
        if (Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.pendingFriends.includes(userId)
          );
          setOnlinePendingFriends(tempUsers);
        }
      }
      if (user.friendRequests !== null && Array.isArray(user.friendRequests)) {
        if (Array.isArray(online)) {
          let tempUsers = online.filter((userId) =>
            user.friendRequests.includes(userId)
          );
          setOnlineFriendRequests(tempUsers);
        }
      }
      if (user.image !== "") {
        setPhoto();
      } else {
        setPhoto(
          "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
        );
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
                src={`http://localhost:3007/uploads/images/${user.image}`}
                alt='default'
                style={{ width: "150px", height: "auto" }}
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
