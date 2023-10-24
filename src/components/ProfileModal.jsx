import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../config/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { isValidEmailProvider } from "../constants/helper";

const ProfileModal = ({ onClose, state }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <h2>{state === "name" ? "Update Name" : "Change Password"}</h2>

                {state === "name" ? (
                  <Form className="FormPage">
                    <Form.Group className="Group">
                      <Form.Label className="LeftAlignedLabel">
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        className="FormInput"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  <Form className="FormPage">
                    <Form.Group className="Group">
                      <Form.Label className="LeftAlignedLabel">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="password"
                        placeholder="Enter your password"
                        className="FormInput"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                )}

                <Button
                  variant="primary"
                  className="submit w-100"
                  //onClick={state ? handleLogin : handleRegister}
                >
                  {state === "name" ? "Update" : "Change"}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
