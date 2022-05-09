import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import React, { Component } from "react";
import AxiosFriends from "../../Routes/friendsRoutes";
import AxiosUsers from "../../Routes/userRoutes";
import ViewUserProfiles from "../../components/ViewUserProfiles/ViewUserProfiles";
import PendingFriends from "../../components/PendingFriends/PendingFriends";
import FriendRequests from "../../components/FriendRequests/FriendRequests";
import CurrentFriends from "../../components/CurrentFriends/CurrentFriends";

// const baseUrl = "http://localhost:3007/api/friends";
//
//CHECK THIS OUT!!
const FriendsPage = () => {
  const [currentFriends, setCurrentFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers();
    setTimeout(() => {
      if (allUsers.length > 0) {
        setCurrentFriends(filterList(user.friendsList));
        setPendingFriends(filterList(user.pendingFriends));
        setFriendRequests(filterList(user.friendRequests));
        
      }
    }, 1000);
  }, []);
  async function getAllUsers() {
    //let config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    //let tempAllUsers = await AxiosUsers.getAllUsers(config);
    //if (tempAllUsers) {
      setAllUsers([{"aboutMe":"","friendsList":["6269fa49bde79154e7d19ec7"],"pendingFriends":[],"friendRequests":[],"projects":[""],"codingLanguages":[""],"dateAdded":"2022-05-08T17:52:00.662Z","image":"","_id":"6268a35950ab71b6af9015d1","name":" Harris","email":"jjvega@devcodecamp.com","password":"$2b$10$XGmHeAppZ9HLO35tXa8XQuoGSGuXvG6jPGURlTpQgadEs5DTUtSia","isAdmin":true,"__v":0,"status":null},{"aboutMe":"","friendsList":[""],"pendingFriends":[""],"friendRequests":[""],"projects":[""],"codingLanguages":[""],"dateAdded":"2022-05-08T17:52:00.662Z","image":"","_id":"6268a4e5ca680e389c478940","name":"J Harris","email":"jharris@devcodecamp.com","password":"$2b$10$wDCgQ7F1wBJU9cEC9BssKOzVKOYRdFFUR9gk.37POzQF8VfGLtMpG","isAdmin":true,"__v":0},{"aboutMe":"","friendsList":["6268a35950ab71b6af9015d1","6269fa49bde79154e7d19ec7","6269fa49bde79154e7d19ec7","6269fa49bde79154e7d19ec7","6269fa49bde79154e7d19ec7"],"pendingFriends":[],"friendRequests":[],"projects":[""],"codingLanguages":[""],"dateAdded":"2022-04-29T00:36:26.707Z","image":"","_id":"626b335b0c246a7c26436e10","name":" Harris","email":"jjharris@devcodecamp.com","password":"$2b$10$XGmHeAppZ9HLO35tXa8XQuoGSGuXvG6jPGURlTpQgadEs5DTUtSia","isAdmin":true,"__v":0},{"aboutMe":"this is a test of the EAS biatch yay","friendsList":["627060d490b327341fa9b120","6271d01b12bf1076c1136a4a"],"pendingFriends":["6271afec5a660f2638bcbb33"],"friendRequests":["6271d043b3355e7bd8ebd41a"],"projects":["YouTube Clone","Imposter's Code Book","Portfolio"],"codingLanguages":["JavaScript","html","css","MongoDB","Express.JS","React.JS","Node.JS","C++"],"dateAdded":"2022-04-29T22:48:17.374Z","image":"89c15df0-cee0-11ec-9122-61aee34fc830.jpeg","_id":"626c76bb2862e32f946cd722","name":"Chris Krieg","email":"cdkrieg@outlook.com","password":"$2b$10$1FUgr//E9JSVRgh/CEX3U.PqVKDbYPReL1wp0c6v8CKGXFpMNdmBa","isAdmin":true,"__v":0},{"aboutMe":"     Yoooo ","friendsList":["6269fc3d993d6155b0b95a67","626c76bb2862e32f946cd722"],"pendingFriends":[],"friendRequests":[],"projects":[],"codingLanguages":[],"dateAdded":"2022-05-02T22:51:01.107Z","image":"","_id":"627060d490b327341fa9b120","name":"Jonathan","email":"devjleviharris@gmail.com","password":"$2b$10$RlxlHS70zKSVbMOXgSrhIOJgG/I5s4mQUDSMPEwhUnTc5hDDMgEJ.","isAdmin":true,"__v":0},{"aboutMe":"     ","friendsList":["627060d490b327341fa9b120"],"pendingFriends":[],"friendRequests":[],"projects":[],"codingLanguages":[],"dateAdded":"2022-05-03T22:42:14.413Z","image":"","_id":"6271afec5a660f2638bcbb33","name":"Montrae Jemison","email":"montrae.c.jemison@gmail.com","password":"$2b$10$3yXD1frMYNF6RNU3.FoSp.Jk/lY884k/aq62COZZ7yj0s.O80dXBC","isAdmin":true,"__v":0},{"aboutMe":"     ","friendsList":[],"pendingFriends":[],"friendRequests":[],"projects":[],"codingLanguages":[],"dateAdded":"2022-05-04T00:59:52.791Z","image":"","_id":"6271d01b12bf1076c1136a4a","name":"Chris Test","email":"chris@test.com","password":"$2b$10$ZB4MzXZ4WPRzUg.QmX8KGuLH0fhm4nNDgxEpzCSlfZCix.V7Rx83O","isAdmin":true,"__v":0},{"aboutMe":"     adsadasdasd, saa","friendsList":["627060d490b327341fa9b120"],"pendingFriends":[],"friendRequests":[],"projects":[""],"codingLanguages":["edede","eeded","ededed","ededed","d","e","e","ed","ed","ed","ed","ed",""],"dateAdded":"2022-05-04T01:00:30.272Z","image":"cc6c9750-cef9-11ec-b8cf-7547bc6d0014.jpeg","_id":"6271d043b3355e7bd8ebd41a","name":"Adam Davidson","email":"agdavidson91@gmail.com","password":"$2b$10$LUwGhb9PWl154HvncqugfeP5J4C7rM8R5UY3jwJSz3PlfMt8boINu","isAdmin":true,"__v":0}]);
    }
   // console.log("No Users");
  //}

  //generic function to send back a filtered list
  function filterList(array) {
     let temp=
     allUsers.filter((_id) => {
      array.includes(_id);
      console.log (temp)
      return temp
    });
  }

  return (
    <div>
      <h1>Friends Page for {user.name}</h1>
      <ViewUserProfiles allUsers={allUsers} />
      <PendingFriends pendingFriends={pendingFriends} />
      <FriendRequests friendRequests={friendRequests} />
      <CurrentFriends currentFriends={currentFriends} />
    </div>
  );
  //html elements will go here and js needs to be before {}*/
};

export default FriendsPage;
