import "./ProfilePage.css";

import { Col, Container, Row } from "react-bootstrap";
import React, { useContext } from "react";

import AboutMe from "../../components/AboutMe/AboutMe";
import AuthContext from "../../context/AuthContext";
import ListOfCoding from "../../components/ListOfCoding/ListOfCoding";
import Projects from "../../components/Projects/Projects";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="profile-name">Profile for {user.name}</h1>
      <div className="profile">
        <Row className="body">
          <Col></Col>
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
