import "./ProfilePage.css";

import { Col, Row } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";

import AboutMe from "../../components/AboutMe/AboutMe";
import AuthContext from "../../context/AuthContext";
import ListOfCoding from "../../components/ListOfCoding/ListOfCoding";
import Projects from "../../components/Projects/Projects";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState();
  const [photAlt, setPhotoAlt] = useState();
  
  useEffect(() => {
    if (user.image !== "") {
      setPhoto(`http://localhost:3007/uploads/images/${user.image}`);
      setPhotoAlt(user.name)
    } else {
      setPhoto(
        "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
      );
      setPhotoAlt("Default Image Placeholder")
    }
  }, [user])
  
  
  return (
    <div>
      <h1>Profile for {user.name}</h1>
      <div className='profile'>
        <Row className='body'>
          <Col>
            {!user || !user.image ? <ImageUpload /> : <img src={photo} alt={photAlt} style={{width:"10vw", height:"15vh"}}/>}
          </Col>
          <Col>
            <Projects />
            <AboutMe />
          </Col>

          <Col>
            <ListOfCoding />
          </Col>
        </Row>
        
      </div>
    </div>
    
  );
};

export default ProfilePage;
