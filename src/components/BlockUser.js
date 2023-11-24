import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "@mui/icons-material/Error";

const BlockUser = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <ErrorIcon sx={{ color: "red", fontSize: 60 }} />
                <br />
                <br />
                <h1>You are Blocked by Admin</h1>
                <br />
                <p className="description">
                  For Inquiry, please email{" "}
                  <a className="email" href="mailto:Josh@muse-tool.com">
                    Josh@muse-tool.com
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
