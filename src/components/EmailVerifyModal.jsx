import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "@mui/icons-material/Error";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EmailVerifyModal = ({ onClose }) => {
  const email = useSelector((state) => state.User.email);
  const fullName = useSelector((state) => state.User.fullName);
  const auth = getAuth();

  const [verified, setVerified] = useState(true);

  // useEffect(() => {
  //   const checkVerification = () => {
  //     if (auth.currentUser && auth.currentUser.emailVerified) {
  //       //setVerified(true);
  //     }
  //   };
  //   checkVerification();
  //   const intervalId = setInterval(() => {
  //     checkVerification();
  //   }, 3000); // 5000 milliseconds = 5 seconds
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              {verified ? (
                <Col>
                  <h1>Thank you for subscribing</h1>

                  <p className="description">
                    If you have any questions, please email{" "}
                    <a className="email" href="mailto:Josh@muse-tool.com">
                      Josh@muse-tool.com
                    </a>
                  </p>

                  <button
                    type="button"
                    width="300px"
                    className="btnSuccess"
                    onClick={onClose}
                  >
                    Start Musing
                  </button>
                </Col>
              ) : (
                <Col>
                  <div className="before-after-text"></div>
                  <ErrorIcon sx={{ color: "orange", fontSize: 60 }} />
                  <br />
                  <br />
                  <h1>Verify your Email to Muse</h1>
                  <br />
                  <h6>Verification Link has been sent to your email</h6>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyModal;
