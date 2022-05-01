import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './ProfilePage.css'
import AboutMe from './AboutMe/AboutMe';
import Projects from './Projects/Projects';

const ProfilePage = (props) => {
    const { user } = useContext(AuthContext);

    return ( 
        <div className='profilePage'>
            <Projects user={user} />
            <AboutMe user={user} />
        </div>
     );
}
 
export default ProfilePage;
