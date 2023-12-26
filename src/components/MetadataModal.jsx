import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setMetadata } from "../slices/UserSlice";

const MetadataModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.User.email);

  const [formData, setFormData] = useState({
    goals: "",
    targetAudience: "",
    personalizePosts: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  const handleSubmit = () => {
    if (formData.goals === "" || formData.targetAudience === "") {
      toast.error("Please fill required fields !", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    dispatch(setMetadata({ metadata: formData }));

    // Replace this with the actual data you want to update
    const dataToUpdate = {
      email,
      goals: formData.goals,
      personalizePosts: formData.personalizePosts,
      targetAudience: formData.targetAudience,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/update-user-metadata`,
        dataToUpdate
      )
      .then((response) => {
        console.log("Response:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user metadata:", error);
      });
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <h2>Personalization</h2>
                <h6>
                  Help us personalize your experience by answering a few
                  questions
                </h6>
                <Form className="FormPage">
                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      Goals<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="goals"
                      placeholder="What are your goals from posting on Linkedin?"
                      className="FormInput"
                      value={formData.goals}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      Target Audience <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="targetAudience"
                      placeholder="Who exactly would you like your posts and message to target?"
                      className="FormInput"
                      value={formData.targetAudience}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      Personalize Your Posts
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="personalizePosts"
                      placeholder="What are other detail about yourself would you wish to include to better refine your posts?"
                      className="FormInput"
                      value={formData.personalizePosts}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>

                <Button
                  variant="primary"
                  className="submit w-100"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MetadataModal;
