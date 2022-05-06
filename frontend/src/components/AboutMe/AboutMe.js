import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Modal, Form, Button } from "react-bootstrap";
import AxiosUsers from "../../Routes/userRoutes";

const AboutMe = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [aboutMe, setAboutMe] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if(!aboutMe)
    setAboutMe(user.aboutMe);

  }, []);



  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updatedUser = await AxiosUsers.updateUser(user._id, {update: { property: 'aboutMe', value: aboutMe }});
      console.log(updatedUser)
      setAboutMe(updatedUser.aboutMe)
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>ABOUT ME</h3>
      <Button type='button' onClick={handleShow}>
        Edit
      </Button>
      <br />
      <p>{aboutMe && aboutMe}</p>
      <br />
      <Modal show={show} onHide={handleClose} className='modal fade' backdrop='static'>
        <Modal.Header>
          <Modal.Title>
            EDIT: About Me (must be at least 5 characters long!
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group>
            <br />
            <Form.Control
              className='textArea'
              type='textArea'
              value={aboutMe}
              onChange={(event) => {
                setAboutMe(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") handleSubmit(event);
              }}
            />
            <br />
            <Button
              type='btn'
              className="button primary"
              onClick={(event) => {
                handleSubmit(event);
              }}>
              Submit
            </Button>
            <Button
              type='button'
              variant='secondary'
              className='close'
              onClick={handleClose}>
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutMe;
