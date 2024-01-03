import React, { useState, useEffect } from "react";
import "../style/Packages.css";
import ModalPopup from "../components/ModalPopup";
import { useSelector } from "react-redux";
import {
  MonthlyPro,
  MonthlyStarter,
  YearlyPro,
  YearlyStarter,
} from "../components/Package";
import { createCheckoutSession } from "../constants/helper";
import Swal from "sweetalert2";

export function Modal({ children, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

const Packages = () => {
  const [activePlan, setActivePlan] = useState("Monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const authState = useSelector((state) => state.Auth.authState);
  const { email, username } = useSelector((state) => state.User);

  const hideModal = () => {
    setShowPostModal(false);
  };

  const handlePayment = async (price_id) => {
    if (!authState) {
      setShowPostModal(true);
    } else {
      Swal.fire({
        title: "Do you have a Referral Code?",
        text: "Avail 20% discount using referral code",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let inputValue;
          const { value: temp } = await Swal.fire({
            title: "Referral Code",
            input: "text",
            inputLabel: "Avail 20% discount using referral code",
            inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            },
          });
          setReferralCode(temp);
        }
        const url = await createCheckoutSession(
          email,
          username,
          referralCode,
          price_id
        );
        console.log(url);
        window.open(url, "_blank");
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePlanChange = (planType) => {
    setActivePlan(planType);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  return (
    <div className="Packages container ">
      <div className="PackagesContent">
        <p>Pricing</p>
        <h4>Pricing for all your content needs</h4>
        <p>It doesn't cost. It pays. Cancel anytime (monthly)</p>

        {/* <div className="coming-soon">
          <span>Coming Soon....</span>
        </div> */}
        <button
          href="#"
          className={`btn btn-primary plan ${
            activePlan === "Monthly" ? "active" : ""
          }`}
          onClick={() => handlePlanChange("Monthly")}
        >
          Monthly
        </button>
        <button
          href="#"
          className={`btn btn-primary plan ${
            activePlan === "Yearly" ? "active" : ""
          }`}
          onClick={() => handlePlanChange("Yearly")}
        >
          Yearly
        </button>
      </div>

      {activePlan === "Monthly" && (
        <div className="row d-flex flex-row justify-content-center w-100 ">
          <MonthlyStarter
            handlePayment={handlePayment}
            cancel={false}
            email={email}
          />
          <MonthlyPro
            handlePayment={handlePayment}
            cancel={false}
            email={email}
          />
        </div>
      )}

      {activePlan === "Yearly" && (
        <div className="row d-flex flex-row justify-content-center w-100">
          <YearlyStarter
            handlePayment={handlePayment}
            cancel={false}
            email={email}
          />
          <YearlyPro
            handlePayment={handlePayment}
            cancel={false}
            email={email}
          />
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={hideModal} />}
    </div>
  );
};

export default Packages;
