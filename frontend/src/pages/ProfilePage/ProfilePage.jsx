import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './ProfilePage.css'
import AboutMe from '../../components/AboutMe/AboutMe';
import Projects from '../../components/Projects/Projects';
import ListOfCoding from '../../components/ListOfCoding/ListOfCoding'

const ProfilePage = (props) => {
    const { user } = useContext(AuthContext);

    return ( 
        <div className='container'>
            <h1>Profile for {user.name}</h1>
            {/* <Projects user={user} />
            <AboutMe user={user} />
            <ListOfCoding user={user} /> */}
        </div>
     );
}
 
export default ProfilePage;
