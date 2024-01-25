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
  sendEmailVerification,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { isEmail } from "../constants/helper";
import { setUser } from "../slices/UserSlice";
import { getSubscription, setSubscription } from "../slices/SubscriptionSlice";
import { setPoints } from "../slices/SubscriptionSlice";
import Swal from "sweetalert2";
import { setCurrentUser } from "../slices/AuthSlice";
import { getTeams } from "../slices/TeamsSlice";

const ModalPopup = ({ state, onClose, overlay }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    company: "",
  });

  const [authState, setAuthState] = useState(state); //false for sign up | true for sign in
  const [customer, setCustomer] = useState(false); //false for new customer, true for new customer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !overlay) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  const handleAuthChange = () => {
    setAuthState(!authState);
    const container = document.querySelector(".Maincontainer");
    container.scrollIntoView({ behavior: "smooth" });
  };

  const continueWithGoogle = async (e) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        Swal.fire({
          title: "Signed In!",
          icon: "success",
          showConfirmButton: false, // Hide the "OK" button in the success popup
          timer: 1000,
        });

        onClose();

        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              toast.success("Email Verification Link Sent", {
                position: "top-right",
                autoClose: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
              toast.success("Error sending Email Verification Link", {
                position: "top-right",
                autoClose: 1500,
              });
            });
        }

        const temp = {
          fullName: user.displayName,
          email: user.email,
          username: user.uid,
        };

        // let referralCode = null;

        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/registeration`,
            temp
          );

          // referralCode = response.data.user.referralCode;

          await axios.post(`${process.env.REACT_APP_BASE_URL}/api/useremail`, {
            fullName: user.displayName,
            email: user.email,
            type: "new", // new user
          });
        } catch (error) {
          if (error.response) {
            const errorMessage = error.response.data.error;
            setCustomer(true);
            console.log(errorMessage);
          } else {
            console.log("An unexpected error occurred:", error);
            toast.error("An unexpected error occurred", {
              position: "top-right",
              autoClose: 1500,
            });
          }
        }

        if (customer) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/userdata`,
              {
                email: user.email,
              }
            );

            const user1 = response.data.user;

            dispatch(
              setUser({
                user: { ...user1, metadataAsked: false, authType: "google" },
              })
            );

            dispatch(setCurrentUser({ name: user1.username, id: user1.email }));
            dispatch(getTeams({ email: user1.email }));
            dispatch(getSubscription({ email: user1.email }));

            if (response.data.subscription) {
              const { id, createdDate, expiresDate, type, points } =
                response.data.subscription;
              dispatch(
                setSubscription({
                  subscription: { id, createdDate, expiresDate, type },
                })
              );
              dispatch(setPoints({ points }));
            }
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
        } else {
          dispatch(
            setUser({
              user: {
                ...temp,
                metadataAsked: false,
                authType: "google",
                // referralCode: referralCode,
              },
              write: true,
            })
          );
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      formData.fullName &&
      formData.password &&
      formData.email &&
      formData.username
    ) {
      if (!isEmail(formData.email)) {
        toast.error("Invalid Email", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      // let referralCode = null;

      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/registeration`,
          {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            company: formData.company,
          }
        );

        // referralCode = response.data.user.referralCode;
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          console.log(errorMessage);

          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 1500,
          });
        } else {
          console.log("An unexpected error occurred:", error);
          toast.error("An unexpected error occurred", {
            position: "top-right",
            autoClose: 1500,
          });
        }

        return;
      }

      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed up

          Swal.fire({
            title: "Registeration Successfull!",
            icon: "success",
            showConfirmButton: false, // Hide the "OK" button in the success popup
            timer: 1000,
          });

          dispatch(
            setUser({
              user: {
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                authType: "emailPassword",
                // referralCode,
                metadataAsked: false,
              },
              write: true,
            })
          );

          onClose();

          sendEmailVerification(auth.currentUser)
            .then(() => {
              toast.success("Email Verification Link Sent", {
                position: "top-right",
                autoClose: 1500,
              });
            })
            .catch(() => {
              toast.success("Error sending Email Verification Link", {
                position: "top-right",
                autoClose: 1500,
              });
            });
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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (formData.email && formData.password) {
        let user = null;
        let subscription = null;

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/signin`,
            {
              key: formData.email, //key can be either email or username
            }
          );

          if (response.status === 200) {
            // If the request was successful, access the email from the response data
            user = response.data.user;
            if (response.data.subscription) {
              subscription = response.data.subscription;
            }
          } else {
            // Handle the case where the response status is not 200 (e.g., server error)
            toast.error("User not found", {
              position: "top-right",
              autoClose: 1500,
            });
            return;
          }
        } catch (error) {
          console.log(error);
          if (error.response) {
            const errorMessage = error.response.data.error;

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
        }

        signInWithEmailAndPassword(auth, user.email, formData.password)
          .then((userCredential) => {
            // Signed up

            Swal.fire({
              title: "Signed In!",
              icon: "success",
              showConfirmButton: false, // Hide the "OK" button in the success popup
              timer: 1000,
            });

            onClose();

            if (subscription) {
              const { id, createdDate, expiresDate, type, points } =
                subscription;
              dispatch(
                setSubscription({
                  subscription: { id, createdDate, expiresDate, type },
                })
              );
              dispatch(setPoints({ points }));
            }

            dispatch(
              setUser({
                user: {
                  ...user,
                  metadataAsked: false,
                  authType: "emailPassword",
                },
                write: true,
              })
            );

            dispatch(setCurrentUser({ name: user.username, id: user.email }));
            dispatch(getTeams({ email: user.email }));
            dispatch(getSubscription({ email: user.email }));

            // ...
          })
          .catch((error) => {
            console.log(error);
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
                toast.error("Invalid Login Credentials", {
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
              case "auth/too-many-requests":
                // Display an error message to the user that their account has been disabled.
                toast.error("Too many requests. Temporarily blocked", {
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
    <div className="modal" onClick={handleOverlayClick}>
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
                        Company (Optional)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        placeholder="Enter your company"
                        className="FormInput"
                        value={formData.company}
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
