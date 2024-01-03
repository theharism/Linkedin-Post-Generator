import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    dispatch(setMetadata({ metadata: formData }));

    if (formData.goals === "" || formData.targetAudience === "") {
      onClose();

      return;
    }

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
                <h2>Profile Personalization</h2>
                <h6>
                  This is for Muse to better craft more personalized posts for
                  you
                </h6>
                <Form className="FormPage">
                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">Goals</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="goals"
                      placeholder="What are your goals from posting on Linkedin?"
                      className="FormInput"
                      value={formData.goals}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      Target Audience
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="targetAudience"
                      placeholder="Who exactly would you like your posts and message to target?"
                      className="FormInput"
                      value={formData.targetAudience}
                      onChange={handleChange}
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
                <div style={{ fontSize: 16, color: "black", margin: 10 }}>
                  OR
                </div>
                <Button
                  variant="primary"
                  className="submit w-100"
                  onClick={handleSubmit}
                >
                  Not interested in making my posts more personalized
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
