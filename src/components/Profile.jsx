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
} from "firebase/auth";
import { isValidEmailProvider } from "../constants/helper";
import ModalPopup from "./ModalPopup";
import ProfileModal from "./ProfileModal";

const ProfilePopup = ({ onClose }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isModalOpen, setIsModalOpen] = useState("");

  const closeModal = () => {
    setIsModalOpen("");
  };

  const openModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <Container className="PostGenContaier">
      <div className="container">
        <div className="heading">
          <h1 className="bold-text">Profile Settings</h1>
        </div>
        <div className="creator-content">
          <label>Referal Code:</label>
          <label>theharismabsh13</label>
        </div>

        <div className="creator-content">
          <Button onClick={() => openModal("name")}>Update Name</Button>
        </div>
        <div className="creator-content">
          <Button onClick={() => openModal("password")}>Change Password</Button>
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
