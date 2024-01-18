import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ heading, subheading, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <h2>{heading}</h2>
                <h6>{subheading}</h6>
                {children}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Modal;
