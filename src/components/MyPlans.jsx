import React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../style/MyPlans.css";
import { CustomizePlan } from "./Package";
import Swal from "sweetalert2";
import { resetSubscription } from "../slices/SubscriptionSlice";
import Modal from "./Modal";
import { Row } from "react-bootstrap";

const MyPlans = ({ type, onClose }) => {
  const { email } = useSelector((state) => state.User);
  const subscription = useSelector((state) => state.Subscription);
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    onClose();

    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCancelPlan = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/cancelSubscription`,
            { email }
          );

          if (response.data.message) {
            Swal.fire({
              title: response.data.message,
              icon: "success",
              showConfirmButton: true,
            });
            dispatch(
              resetSubscription({
                ...subscription,
                id: "***",
              })
            );
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: false, // Hide the "OK" button in the success popup
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <Modal
      onClose={onClose}
      heading={"My Plans"}
      subheading={"Customize your plans according to your needs"}
    >
      <Row className="justify-content-evenly">
        <CustomizePlan title={"Upgrade"} type={1} onClick={handleUpgrade} />
        <CustomizePlan
          title={type.split(" ")[0]}
          type={2}
          onClick={handleCancelPlan}
        />
      </Row>
    </Modal>
  );
};

export default MyPlans;
