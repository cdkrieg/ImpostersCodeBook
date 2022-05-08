import "../../pages/ProfilePage/ProfilePage.css";

import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import AxiosUsers from "../../Routes/userRoutes";

const ListOfCoding = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [codingLanguages, setCodingLanguages] = useState();
  const [tempCodingLanguages, setTempCodingLanguages] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!codingLanguages) {
      setCodingLanguages(user.codingLanguages);
      setTempCodingLanguages(user.codingLanguages.toString());
    } else setTempCodingLanguages(codingLanguages.toString());
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let newArray = tempCodingLanguages.split(",");
    handleClose();
    try {
      const { error } = await AxiosUsers.updateUser(user._id, {
        update: { property: "codingLanguages", value: newArray },
      });
      if (error) {
        return alert("Could not update user!");
      }
      setCodingLanguages(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="coding-container">
        <h3>LIST OF CODING LANGUAGES AND CERTS </h3>
        <br />
        <ul>
          {codingLanguages &&
            codingLanguages.map((language, index) => {
              return <li key={index}>{language}</li>;
            })}
        </ul>
        <br />
        <div className="coding-buttons">
          <Button type="button" onClick={handleShow}>
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
          <Modal.Title>EDIT: List of Coding Languages and Certs</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group>
            <br />
            <div className="form-container">
              <Form.Control
                className="textArea"
                type="textArea"
                value={tempCodingLanguages}
                onChange={(event) => {
                  setTempCodingLanguages(event.target.value);
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter") handleSubmit(event);
                }}
              />
              <br />
              <div className="coding-form-buttons">
                <Button
                  type="btn"
                  style={{ margin: "0px 1em 1em 0px" }}
                  className="button primary"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  style={{ marginBottom: "1em" }}
                  variant="secondary"
                  className="close"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default ListOfCoding;
