import "../../pages/ProfilePage/ProfilePage.css";

import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";

const Projects = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState();
  const [tempProjects, setTempProjects] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!projects) {
      setProjects(user.projects);
      setTempProjects(user.projects.toString());
    } else setTempProjects(projects.toString());
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let newArray = tempProjects.split(",");
    handleClose();
    try {
      const { error } = await AxiosUsers.updateUser(user._id, {
        update: { property: "projects", value: newArray },
      });
      if (error) {
        return alert("Could not update user!");
      }
      setProjects(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="projects-container">
        <h3>PROJECTS</h3>

        <br />

        <ul>
          {projects &&
            projects.map((project, index) => {
              return <li key={index}>{project}</li>;
            })}
        </ul>
        <br />
        <div className="profile-buttons">
          <Button className="profile-button" type="button" onClick={handleShow}>
            Edit
          </Button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>EDIT: Projects</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group>
            <br />
            <Form.Control
              className="textArea"
              type="textArea"
              value={tempProjects}
              onChange={(event) => {
                setTempProjects(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") handleSubmit(event);
              }}
            />
            <br />
            <Button
              type="btn"
              className="button primary"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="close"
              onClick={handleClose}
            >
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects;
