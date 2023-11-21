import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "@mui/icons-material/Error";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Typography } from "@mui/material";
import "../style/MyPlans.css";
import {
  MonthlyPro,
  MonthlyStarter,
  UpgradePlan,
  YearlyPro,
  YearlyStarter,
} from "./Package";
import Swal from "sweetalert2";
import { resetSubscription } from "../slices/SubscriptionSlice";

const MyPlans = ({ type, onClose }) => {
  const email = useSelector((state) => state.User.email);
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    onClose();

    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePayment = async () => {
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
              showConfirmButton: false, // Hide the "OK" button in the success popup
              timer: 1000,
            });
            dispatch(resetSubscription());
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: error.response.data.error,
            icon: "warning",
            showConfirmButton: false, // Hide the "OK" button in the success popup
            timer: 1000,
          });
        }
      }
    });
  };

  const ShowCurrentSubscription = () => {
    switch (type) {
      case "Starter (Monthly)":
        return (
          <MonthlyStarter
            handlePayment={handlePayment}
            cancel={true}
            email={email}
          />
        );
      case "Pro (Monthly)":
        return (
          <MonthlyPro
            handlePayment={handlePayment}
            cancel={true}
            email={email}
          />
        );
      case "Starter (Yearly)":
        return (
          <YearlyStarter
            handlePayment={handlePayment}
            cancel={true}
            email={email}
          />
        );
      case "Pro (Yearly)":
        return (
          <YearlyPro
            handlePayment={handlePayment}
            cancel={true}
            email={email}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="containerForm ">
          <Col className="row d-flex flex-row justify-content-evenly w-100">
            <div style={{ height: "50px" }} />
            <UpgradePlan handleUpgrade={handleUpgrade} />
            <ShowCurrentSubscription />
            <div style={{ height: "50px" }} />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default MyPlans;
