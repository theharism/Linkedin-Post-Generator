import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/ModelContent.css";
import axios from "axios";

function ModelContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    NoOfMuseUsers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData);
      const response = await axios.post(
        "http://localhost:4000/contactUs",
        formData
      );

      console.log(response);
    } catch (eror) {
      console.log(eror);
    }
  };

  return (
    <div>
      <Row className="containerModel ">
        <Col>
          <div className="before-after-text"></div>
          <h2>Contact US</h2>
          <Form className="containerModel_FormPAge" onSubmit={handleSubmit}>
            <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="FormInput"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                className="FormInput"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                className="FormInput"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="containerModel_submit"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ModelContent;
