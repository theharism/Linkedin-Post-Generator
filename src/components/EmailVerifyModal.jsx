import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "@mui/icons-material/Error";

const EmailVerifyModal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <ErrorIcon sx={{ color: "orange", fontSize: 60 }} />
                <br />
                <br />
                <h1>Verify your Email to Muse</h1>
                <br />
                <h6>Verification Link has been sent to your email</h6>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyModal;
