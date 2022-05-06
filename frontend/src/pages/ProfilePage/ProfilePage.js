import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";
import AboutMe from "../../components/AboutMe/AboutMe";
import Projects from "../../components/Projects/Projects";
import ListOfCoding from "../../components/ListOfCoding/ListOfCoding";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <Container className='profile'>
      <Row>
        <h1>Profile for {user.name}</h1>
      </Row>

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
    </Container>
  );
};

export default ProfilePage;
