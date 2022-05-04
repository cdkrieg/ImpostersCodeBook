import React, {useContext} from 'react';
import AuthContext from '../../context/AuthContext';


const AboutMe = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <h3>ABOUT ME</h3>
      <br />
      <p>{user && user.aboutMe}</p>
      <br/>
    </div>
  );
};

export default AboutMe;
