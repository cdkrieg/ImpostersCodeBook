import React, { useState, useEffect, useContext } from 'react';
import AxiosOnlineStatus from '../../Routes/status';
import AxiosFriends from '../../Routes/friendsRoutes';
import AxiosUsers from '../../Routes/userRoutes';
import AuthContext from '../../context/AuthContext';

const SideBar = () => {
    let {user} = useContext(AuthContext)
    let [friendList, setFriendList] = useState(user.friendList);
    let [pendingFriends, SetPendingFriends] = useState(user.pendingFriends)
    let [friendRequests, setFriendRequests] = useState(user.friendRequests)
    let [online, setOnline] = useState([]);

    useEffect(() => {
      
    
    }, [])
    
async function getOnlineUsers(){
    
}

    return ( 
        <div>

        </div>
     );
}
 
export default SideBar;
