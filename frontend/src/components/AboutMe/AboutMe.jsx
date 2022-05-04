import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Modal, Form, Button } from "react-bootstrap";
import updateUser from "../../Routes/userRoutes";

const AboutMe = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [aboutMe, setAboutMe] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    setAboutMe(user.aboutMe);
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();
    handleClose();
    try {
    const { error } = updateUser(user._id, { aboutMe: aboutMe });
    if (error) {
      alert("Could not update user!");
    }
    } catch (error) {
      console.log(error)
    }
    }
  }

  return (
    <div>
      <h3>ABOUT ME</h3>
      <Button type='button' onClick={handleShow}>
        Edit
      </Button>
      <br />
      <p>{user && user.aboutMe}</p>
      <br />
      <Modal show={show} onHide={handleClose} className='modal fade'>
        <Form onSubmit={(event)=>handleSubmit(event)}>
          <Form.Group>
            <Form.Label>
              About Me (must be at least 5 characters long!
            </Form.Label>
            <Form.Control
              type='textArea'
              value={aboutMe}
              onChange={(event) => {
                setAboutMe(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") handleSubmit(event);
              }}
            />
            <Button
              type='btn'
              onClick={(event) => {
                handleSubmit(event);
              }}>
              Submit
            </Button>
            <Button type='button' className='close' onClick={handleClose}>
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutMe;
