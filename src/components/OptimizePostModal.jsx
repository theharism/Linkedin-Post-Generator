import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ClipLoader } from "react-spinners";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import axios from "axios";

const OptimizePostModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    content: "",
    props: "",
  });
  const [loading, setLoading] = useState(false);

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

  async function handleSubmitOptimize(e) {
    e.preventDefault();
    if (formData.content !== "") {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/optimize`,
          { content: formData.content, props: formData.props }
        );

        if (response.data.message) {
          if (formData.props === "") {
            setFormData({
              ...formData,
              props: response.data.message.content,
            });
          } else {
            Swal.fire({
              title: "Post Optimized",
              icon: "success",
              showConfirmButton: false, // Hide the "OK" button in the success popup
              timer: 1500,
            });
            setFormData({
              ...formData,
              content: response.data.message.content,
              props: "",
            });
          }
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error optimizing post",
          icon: "error",
          showConfirmButton: false, // Hide the "OK" button in the success popup
          timer: 1500,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <h2>Optimization</h2>
                <h6>Optimize your post</h6>
                <Form className="FormPage">
                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      {formData.props === "" ? (
                        <span>
                          Paste your post here
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      ) : (
                        "Strengths & Weaknesses"
                      )}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name={formData.props === "" ? "content" : "props"}
                      placeholder="Paste your post here..."
                      className="FormInput"
                      value={
                        formData.props === ""
                          ? formData.content
                          : formData.props
                      }
                      onChange={handleChange}
                      style={{
                        height: 200,
                      }}
                      required
                    />
                  </Form.Group>
                </Form>
                <br />
                <Button
                  variant="primary"
                  className="submit w-100"
                  onClick={handleSubmitOptimize}
                >
                  {loading ? (
                    <ClipLoader color={"#123abc"} loading={loading} size={25} />
                  ) : formData.props === "" ? (
                    "Optimize"
                  ) : (
                    "Optimize post based on feedback"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default OptimizePostModal;
