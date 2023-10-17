import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
      if (formData.firstName && formData.lastName && formData.email) {
        const response = await axios.post(
          "http://localhost:3000/api/registeration",
          formData
        );
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
        });
        onClose();
        console.log(response);
      } else {
        toast.error("Please fill in all required fields", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="Maincontainer">
          <Container className="AffiliatesContainer">
            <Row className="containerForm ">
              <Col>
                <div className="before-after-text"></div>
                <h2>Register To Muse</h2>
                <Form className="FormPAge" onSubmit={handleSubmit}>
                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className="FormInput"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="Group">
                    <Form.Label className="LeftAlignedLabel">
                      Last Name
                    </Form.Label>
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

                  <Button variant="primary" type="submit" className="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;

// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import "../style/Affilicates.css";
// import axios from "axios";

// const ModalPopup = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     companyName: "",
//     NoOfMuseUsers: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       onClose();
//       console.log("Form data:", formData);
//       const response = await axios.post(
//         "http://localhost:4000/contactUs",
//         formData
//       );

//       console.log(response);
//     } catch (eror) {
//       console.log(eror);
//     }
//   };

//   return (
//     <div className="Maincontainer">
//       <Container className="AffiliatesContainer">
//         <Row className="containerForm ">
//           <Col>
//             <div className="before-after-text"></div>
//             <h2>Join Our Affiliate Program</h2>
//             <Form className="FormPAge" onSubmit={handleSubmit}>
//               <p>
//                 Join Our Program To Receive 20% Commission For First 12 Months
//                 of Every Sign-Up Using Your Affiliate Code.
//               </p>
//               <Form.Group className="Group">
//                 <Form.Label className="LeftAlignedLabel">First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="firstName"
//                   placeholder="Enter your first name"
//                   className="FormInput"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="Group">
//                 <Form.Label className="LeftAlignedLabel">Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="lastName"
//                   placeholder="Enter your last name"
//                   className="FormInput"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="Group">
//                 <Form.Label className="LeftAlignedLabel">
//                   Email Address
//                 </Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="FormInput"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="Group">
//                 <Form.Label className="LeftAlignedLabel">
//                   Company Name
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="companyName"
//                   placeholder="Enter your company name"
//                   className="FormInput"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="Group">
//                 <Form.Label className="LeftAlignedLabel">
//                   No: of Muse Users
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="NoOfMuseUsers"
//                   placeholder="No Of Muse Users"
//                   className="FormInput"
//                   value={formData.NoOfMuseUsers}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Button variant="primary" type="submit" className="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ModalPopup;
