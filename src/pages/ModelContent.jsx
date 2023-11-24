import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/ModelContent.css";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function ModelContent({ closeModal }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiry: "",
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
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/sendMail`,
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Request Received Successfully!",
          icon: "success",
          showConfirmButton: false, // Hide the "OK" button in the success popup
          timer: 1000,
        });
        closeModal();
      } else {
        toast.error("Something Went Wrong! Pls try again later", {
          position: "top-right",
          autoClose: 1500, // Display the message for 3 seconds
        });
      }
    } catch (eror) {
      console.log(eror);
      toast.error("Something Went Wrong! Pls try again later", {
        position: "top-right",
        autoClose: 1500, // Display the message for 3 seconds
      });
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
              <Form.Label className="LeftAlignedLabel">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="FormInput"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="FormInput"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group> */}

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
              <Form.Label className="LeftAlignedLabel">Inquiry</Form.Label>
              <textarea
                className="FormInput"
                type="text"
                placeholder="Write your queries here"
                value={formData.inquiry}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    inquiry: event.target.value,
                  })
                }
              />
            </Form.Group>

            {/* <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                className="FormInput"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Form.Group> */}

            {/* <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">
                No. of Muse Users
              </Form.Label>
              <Form.Control
                type="number"
                name="NoOfMuseUsers"
                placeholder="Enter the number of Muse users"
                className="FormInput"
                value={formData.NoOfMuseUsers}
                onChange={handleChange}
              />
            </Form.Group> */}

            {/* <Form.Group className="Group">
              <Form.Label className="LeftAlignedLabel">
                Select Package Type
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Monthly"
                  name="packageType"
                  value="monthly"
                  checked={formData.packageType === "monthly"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Yearly"
                  name="packageType"
                  value="yearly"
                  checked={formData.packageType === "yearly"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group> */}

            <Button
              variant="primary"
              type="submit"
              className="containerModel_submit w-100"
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
