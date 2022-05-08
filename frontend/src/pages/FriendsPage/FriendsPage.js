import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext"
import React, { Component } from 'react';
import AxiosFriends from "../../Routes/friendsRoutes";
// const baseUrl = "http://localhost:3007/api/friends";
// 
//CHECK THIS OUT!!
const FriendsPage = () => {
    const [friendsList, setFriendsList] = useState([])
    const classes = useStyles()
  
    const getFriendsList = () => {
     const {user} = useContext(AuthContext);
        user.friendsList?.map(async friends => {
        let response = await axios.get(
          `http://localhost:3007/api/users/${friends}`
        )
        setFriendsList(friendsList => [...friendsList, response.data])
      })
      return friendsList
    }
      // const sendMessage = () => {
    //   console.log('message sent')
    // }
  
    const viewProfile = (id) => {
      axios.get(`http://localhost:3007/api/users/${user._id}`)
      console.log('friends profile')
    }
  
    useEffect(() => {
      getFriendsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
  
    return (
     <div>
      <Container>
        <Typography style={{ display: 'flex' }}>
        Your {friends} list,
        </Typography>
        <Container className={classes.field} style={{ display: 'flex', marginTop: '75px' }}>
          <Grid container spacing={3}>
            {friendsList.map(friends => (
              <Grid item key={friends.firstName} sx={12} md={12} lg={12}>
                <Controls.UserCard elevation={5} key={friends}
                  firstName={friends.firstName}
                  lastName={friends.lastName}
                  dateJoined={friends.dateJoined}
                  sendAction={sendMessage}
                  buttonTextLeft='Send Message'
                  viewProfile={viewProfile}
                  buttonTextRight='View Profile'
                  id={friends._id}
                  friends={friends}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
      </div>
    );
};


    // useEffect(()=>{
    //     fetch("/pendingList/").then(res => {
    //         if(res.ok) {
    //             return res.json()
    //         }
    //     }).then(jsonRes => setPendingList(jsonRes.pendingList))
    // })

    // return (<div>

    // </div>)

//
  

       const getPendingList = () => {
         user.friendsList?.map(async friends => {
           let response = await axios.get(
             `http://localhost:3007/api/users/${friends}`
           )
           setpendingList(friendsList => [...friendsList, response.data])
         })
         return friendsList
       }
       const getRequestList = () => {
         user.friendsList?.map(async friends => {
           let response = await axios.get(
             `http://localhost:3007/api/users/${friends}`
           )
           setrequestList(friendsList => [...friendsList, response.data])
         })
         return friendsList
    //   }//viewProfile
    //   const getOtherFriendsList = () => {
    //     user.friendsList?.map(async friends => {
    //       let response = await axios.get(
    //         `http://localhost:3007/api/users/${friends}`
    //       )
    //       setOtherFriendsList(friendsList => [...friendsList, response.data])
    //     })
    //     return OtherfriendsList
    //   }
    
    //   const sendMessage = () => {
    //     console.log('message sent')
    //   }
    
    //   const viewProfile = (id) => {
    //     axios.get(`http://localhost:/api/users/${user._id}`)
    //     console.log('friends profile')
    //   }
    
    //   useEffect(() => {
    //     getFriendsList()
     
    //   }, [user])
    
    //return (
        /*<h1 className ="container"> Friends Page for {user.name}!</h1>
        links to my components...hodge podge
        <div>
            input type="text" placeholder=""
        </div>
     );
        //html elements will go here and js needs to be before {}*/
    //};

export default FriendsPage;
