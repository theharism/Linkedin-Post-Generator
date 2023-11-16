import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import "../style/EditPostModal.css";
import { Button } from "react-bootstrap";

const EditPostModal = ({ message, onClose }) => {
  const [editedMessage, setEditedMessage] = useState(message);

  const handleInputChange = (e) => {
    setEditedMessage(e.target.value);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  const handleConfirmClick = () => {
    onClose(editedMessage);
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content" style={{ width: "100%", height: "500px" }}>
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm">
              <Col>
                <h1>Edit Post</h1>

                <div style={{ height: "200%" }}>
                  <textarea
                    value={editedMessage}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 10,
                      boxSizing: "border-box",
                      overflow: "scroll",
                    }}
                    className="responseText"
                  />
                </div>
                <br />
                <Button
                  variant="primary"
                  className="submit w-100"
                  onClick={handleConfirmClick}
                >
                  Confirm
                </Button>
                <br />
                <br />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
