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

  const authState = useSelector((state) => state.Auth.authState);

  const hideModal = () => {
    setShowPostModal(false);
  };

  const handlePayment = (url) => {
    if (!authState) {
      setShowPostModal(true);
    } else {
      window.open(url, "_blank");
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
        <p>It does n't cost. It pays. Cancel anytime (monthly)</p>
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
          <MonthlyStarter handlePayment={handlePayment} cancel={false} />
          <MonthlyPro handlePayment={handlePayment} cancel={false} />
        </div>
      )}

      {activePlan === "Yearly" && (
        <div className="row d-flex flex-row justify-content-center w-100">
          <YearlyStarter handlePayment={handlePayment} cancel={false} />
          <YearlyPro handlePayment={handlePayment} cancel={false} />
        </div>
      )}

      {showPostModal && <ModalPopup state={true} onClose={hideModal} />}
    </div>
  );
};

export default Packages;
