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

const ModalPopup = ({ onClose }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [authState, setAuthState] = useState(false); //false for sign up | true for sign in

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthChange = () => {
    setAuthState(!authState);
    const container = document.querySelector(".Maincontainer");
    container.scrollIntoView({ behavior: "smooth" });
  };

  const continueWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        toast.success("Registration Successfull", {
          position: "top-right",
          autoClose: 1500,
        });
        localStorage.setItem("visitedPostRoute", "true");
        onClose();
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 1500,
        });
        // ...
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.fullName &&
        formData.password &&
        formData.email &&
        formData.username
      ) {
        if (!isValidEmailProvider(formData.email)) {
          toast.error("Invalid Email", {
            position: "top-right",
            autoClose: 1500,
          });
          return;
        }

        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/registeration`, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            if (error.response) {
              const errorMessage = error.response.data.error;
              console.log(errorMessage);

              toast.error(errorMessage, {
                position: "top-right",
                autoClose: 1500,
              });
            } else {
              // Handle network errors or other unexpected issues.
              console.log("An unexpected error occurred:", error);
              toast.error("An unexpected error occurred", {
                position: "top-right",
                autoClose: 1500,
              });
            }

            return;
          });

        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            toast.success("Registration Successfull", {
              position: "top-right",
              autoClose: 1500,
            });
            localStorage.setItem("visitedPostRoute", "true");
            onClose();
            console.log(user);
            // ...
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                // Display an error message to the user that the email address is already in use.
                toast.error("Email already taken", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              case "auth/invalid-email":
                // Display an error message to the user that the email address is invalid.
                toast.error("Invalid Email", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              case "auth/weak-password":
                toast.error("Weak Password", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              default:
                // Display a generic error message to the user.
                toast.error("Unexpected Error", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
            }
          });
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (formData.email && formData.password) {
        let email = null;

        if (!isValidEmailProvider(formData.email)) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/signin`,
              {
                username: formData.email,
              }
            );

            if (response.status === 200) {
              // If the request was successful, access the email from the response data
              email = response.data.email;
              console.log("Received email:", email);
            } else {
              // Handle the case where the response status is not 200 (e.g., server error)
              toast.error("User not found", {
                position: "top-right",
                autoClose: 1500,
              });
            }
          } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.error;
              console.log(errorMessage);

              toast.error(errorMessage, {
                position: "top-right",
                autoClose: 1500,
              });
            } else {
              // Handle network errors or other unexpected issues.
              console.log("An unexpected error occurred:", error);
              toast.error("An unexpected error occurred", {
                position: "top-right",
                autoClose: 1500,
              });
            }
          }
        }

        signInWithEmailAndPassword(
          auth,
          email == null ? formData.email : email,
          formData.password
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            toast.success("Registration Successfull", {
              position: "top-right",
              autoClose: 1500,
            });
            localStorage.setItem("visitedPostRoute", "true");
            onClose();
            console.log(user);
            // ...
          })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case "auth/wrong-password":
                // Display an error message to the user that the password is incorrect.
                toast.error("Wrong Password", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              case "auth/invalid-login-credentials":
                // Display an error message to the user that the email address does not exist.
                toast.error("User not found", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              case "auth/user-disabled":
                // Display an error message to the user that their account has been disabled.
                toast.error("User disabled", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
              default:
                // Display a generic error message to the user.
                toast.error("An unexpected error occurred", {
                  position: "top-right",
                  autoClose: 1500,
                });
                break;
            }
          });
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
                <h2>{authState ? "Sign in to Muse" : "Register To Muse"}</h2>

                {!authState ? (
                  <Form
                    // className={`FormPage ${
                    //   authState ? "vanish-left vanished" : ""
                    // }`}
                    className="FormPage"
                  >
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

                    <Form.Group className="Group">
                      <Form.Label className="LeftAlignedLabel">
                        Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="FormInput"
                        value={formData.username}
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
                ) : (
                  <Form
                    // className={`FormPage ${
                    //   authState ? "" : "vanish-right vanished"
                    // }`}
                    className="FormPage"
                  >
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <button
                    className="auth-state" // Add your custom class name here
                    onClick={handleAuthChange} // Replace "yourFunction" with the actual function you want to call
                  >
                    {authState
                      ? "Not a member? Register here"
                      : "Already a member? Sign in here"}
                  </button>
                </div>

                <Button
                  variant="primary"
                  className="submit w-100"
                  onClick={authState ? handleLogin : handleRegister}
                >
                  {authState ? "Sign in" : "Register"}
                </Button>

                <div className="separator">OR</div>

                <button onClick={continueWithGoogle} className="hollow-button">
                  <img src="google.png" alt="Continue with Google" />
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
