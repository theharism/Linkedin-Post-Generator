import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import Logout from "@mui/icons-material/Logout";
import app from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, sendPasswordResetEmail } from "firebase/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import "react-toastify/dist/ReactToastify.css";
import "../style/ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/UserSlice";
import { Divider } from "@mui/material";
import { PointsSlice } from "../slices/PointsSlice";
import Swal from "sweetalert2";
import { checkSubscriptionType } from "../constants/helper";
import MyPlans from "./MyPlans";

export default function ProfileModal({ anchorEl, open, handleClose }) {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [showMyPlanModal, setShowMyPlanModal] = useState(false);

  const user = useSelector((state) => state.User);
  const subscription = useSelector((state) => state.Subscription.type);
  const points = useSelector((state) => state.Points.points);

  const subscriptionType = checkSubscriptionType(subscription);

  function signout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        localStorage.removeItem("user");

        Swal.fire({
          title: "Signed Out!",
          icon: "success",
          showConfirmButton: false, // Hide the "OK" button in the success popup
          timer: 1000,
        });
      })
      .catch((error) => {
        // An error happened.
        toast.error("Error Signing out", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  }

  const Modal = () => {
    const [formData, setFormData] = useState({
      fullName: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const closeModal = () => {
      setState("");
    };
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        closeModal(); // Close the modal when clicking on the overlay
      }
    };

    const handleUpdateName = () => {
      const requestData = {
        fullName: formData.fullName, // Replace with the new full name
        email: user.email, // Replace with the user's email
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/updateName`, requestData)
        .then((response) => {
          // Handle a successful response
          console.log("User's full name updated:", response.data);
          dispatch(
            setUser({
              user: { ...response.data.user, authType: "emailPassword" },
              write: true,
            })
          );

          toast.success("Name Updated", {
            position: "top-right",
            autoClose: 1500,
          });

          closeModal();
        })
        .catch((error) => {
          // Handle errors
          if (error.response) {
            // The request was made, but the server responded with a non-2xx status code
            console.error(
              "Server error:",
              error.response.status,
              error.response.data
            );
            toast.error("Error updating name", {
              position: "top-right",
              autoClose: 1500,
            });
          } else if (error.request) {
            // The request was made, but no response was received
            console.error("No response received");
          } else {
            // Something happened in setting up the request
            console.error("Request setup error:", error.message);
          }
        });
    };

    const handleChangePassword = () => {
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          // Password reset email sent!
          toast.success("Password Change Email sent", {
            position: "top-right",
            autoClose: 1500,
          });

          closeModal();

          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 1500,
          });
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
                  <h2>
                    {state === "name" && "Update Name"}
                    {state === "password" && "Change Password"}
                  </h2>
                  {state === "name" && (
                    <Form className="FormPage">
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
                    </Form>
                  )}

                  {state === "password" && (
                    <>
                      <br />
                      <h6>
                        A password change link will be send to registered email
                      </h6>
                      <br />
                    </>
                  )}

                  <Button
                    variant="danger"
                    className="submit w-100"
                    onClick={
                      state === "password"
                        ? handleChangePassword
                        : handleUpdateName
                    }
                  >
                    {state === "name" && "Update"}
                    {state === "password" && "Change"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  };

  const infinitySymbolStyle = {
    fontSize: "1.5em", // Adjust the font size as needed
  };

  const handleMyPlan = () => {
    setShowMyPlanModal(true);
    handleClose();
  };

  const onClose = () => {
    setShowMyPlanModal(false);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="TypographyContainer">
          <Typography sx={{ fontFamily: "inherit" }}>
            {user.fullName}
          </Typography>
          {user.authType !== "google" && (
            <IconButton size={"small"} onClick={() => setState("name")}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>
        <Divider />

        <MenuItem sx={{ fontFamily: "inherit" }}>
          <Typography sx={{ fontFamily: "inherit" }}>
            Credits:{" "}
            {points > 10000 ? (
              <span style={infinitySymbolStyle}>&infin;</span>
            ) : (
              points
            )}
          </Typography>
        </MenuItem>

        <MenuItem sx={{ fontFamily: "inherit" }}>
          <Typography sx={{ fontFamily: "inherit" }}>Plan: </Typography>
          <Typography sx={{ fontFamily: "inherit", color: "green" }}>
            &nbsp;{subscription}
          </Typography>
          &nbsp;&nbsp;&nbsp;
          {subscriptionType === "Free" ? (
            <ScrollLink
              to="pricing"
              spy={true}
              smooth={true}
              duration={80}
              offset={30}
            >
              <button onClick={handleClose} className="upgrade-buuton">
                Upgrade
              </button>
            </ScrollLink>
          ) : (
            <>
              <button onClick={handleMyPlan} className="upgrade-buuton">
                My Plan
              </button>
            </>
          )}
        </MenuItem>

        {/* <MenuItem sx={{ fontFamily: "inherit" }}>
          <Typography sx={{ fontFamily: "inherit" }}>
            Referral Code: {user.referalCode}
          </Typography>
        </MenuItem> */}

        {user.authType !== "google" && (
          <>
            <MenuItem
              sx={{ fontFamily: "inherit" }}
              onClick={() => setState("password")}
            >
              <ListItemIcon>
                <LockResetRoundedIcon fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
          </>
        )}
        <MenuItem sx={{ fontFamily: "inherit" }} onClick={signout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {state === "name" && <Modal />}
      {state === "password" && <Modal />}
      {showMyPlanModal && <MyPlans onClose={onClose} type={subscription} />}
    </React.Fragment>
  );
}
