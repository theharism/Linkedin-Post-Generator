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
  updateProfile,
  updatePassword,
  signOut,
} from "firebase/auth";
import { isValidEmailProvider } from "../constants/helper";
import ModalPopup from "./ModalPopup";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const ProfilePopup = ({ onClose }) => {
  const auth = getAuth(app);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [referalcode, setReferalCode] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen("");
  };

  const openModal = (value) => {
    setIsModalOpen(value);
  };

  const hanldesignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Signed Out Successfully", {
          position: "top-right",
          autoClose: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.success("An unexpected error has occurred", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };
  try {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/referalcode`, {
        email: auth.currentUser.email,
      })
      .then((response) => {
        console.log(response);
        setReferalCode(response.data.referalcode);
      });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
    } else {
      console.log("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  }

  return (
    <Container className="PostGenContaier">
      <div className="container">
        <div className="heading">
          <h1 className="bold-text">Profile Settings</h1>
        </div>
        <div className="creator-content">
          <label>Referal Code: </label>
          <label>{referalcode}</label>
        </div>

        <div className="creator-content">
          <Button onClick={() => openModal("name")}>Update Name</Button>
        </div>
        <div className="creator-content">
          <Button onClick={() => openModal("password")}>Change Password</Button>
        </div>
        <div className="creator-content">
          <Button onClick={hanldesignout}>Sign Out</Button>
        </div>
        {isModalOpen === "name" ? (
          <ProfileModal state={"name"} onClose={closeModal} />
        ) : null}
        {isModalOpen === "password" ? (
          <ProfileModal state={"password"} onClose={closeModal} />
        ) : null}
      </div>
    </Container>
  );
};
export default ProfilePopup;
