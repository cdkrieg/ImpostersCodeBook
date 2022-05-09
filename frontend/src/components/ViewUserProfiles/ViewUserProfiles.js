import React, { useContext, useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';

const ViewUserProfiles = () => {
const [hidden, setHidden] = useState (true)
const {user}=useContext(AuthContext)

function handleShowClick (event){
    setHidden (!hidden)
}
    return ( 
        <div>
            <button className='btnFriendsPage' onClick={(event)=>{handleShowClick(event)}}>
                View User Profiles
            </button>
            {/* {!hidden &&  */}
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>About Me</th>
                        <th>Coding Languages</th>
                        <th>Projects</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        user && user.friendsList.map((item, index)=>{
                            <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.aboutMe}</td>
                            <td>{item.codingLanguages}</td>
                            <td>{item.projects}</td>
                            <td><button>Remove</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {/* } */}
        </div>
     );
}
export default ViewUserProfiles;