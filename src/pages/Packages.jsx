import React, { useState } from "react";
import "../style/Packages.css";
import ModalPopup from "../components/ModalPopup";
import { useSelector } from "react-redux";
import { YearlyPackage, MonthlyPackage } from "../components/Package";
import { createCheckoutSession } from "../constants/helper";
import Swal from "sweetalert2";

const Packages = () => {
  const [activePlan, setActivePlan] = useState("Monthly");
  const [showPostModal, setShowPostModal] = useState(false);

  const { authState } = useSelector((state) => state.Auth);
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
        let referralCode = "";
        if (result.isConfirmed) {
          let inputValue = "";
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
          referralCode = temp;
        }
        await createCheckoutSession(email, username, referralCode, price_id);
      });
    }
  };

  const handlePlanChange = (planType) => {
    setActivePlan(planType);
  };

  const ChangePlan = ({ plan }) => (
    <button
      className={`btn btn-primary plan ${activePlan === plan ? "active" : ""}`}
      onClick={() => handlePlanChange(plan)}
    >
      {plan}
    </button>
  );

  return (
    <div className="Packages container ">
      <div className="PackagesContent">
        <p>Pricing</p>
        <h4>Pricing for all your content needs</h4>
        <p>It doesn't cost. It pays. Cancel anytime (monthly)</p>

        <ChangePlan plan={"Monthly"} />
        <ChangePlan plan={"Yearly"} />
      </div>

      <div className="row d-flex flex-row justify-content-center w-100 ">
        {activePlan === "Monthly" ? (
          <>
            <MonthlyPackage
              title={"Starter Package"}
              fullPrice={"$24.99"}
              discountedPrice={"$20.83"}
              isStarter={true}
              handlePayment={() =>
                handlePayment("price_1OLunGJOtdUfVp0D70oWGCYy")
              }
            />
            <MonthlyPackage
              title={"Pro Package"}
              fullPrice={"$49.99"}
              discountedPrice={"$41.66"}
              isStarter={false}
              handlePayment={() =>
                handlePayment("price_1OLuufJOtdUfVp0DIveFknLZ")
              }
            />
          </>
        ) : (
          <>
            <YearlyPackage
              title={"Starter Package"}
              fullPrice={"$249.99"}
              discountedPrice={"$299.99"}
              isStarter={true}
              handlePayment={() =>
                handlePayment("price_1OLutBJOtdUfVp0DQBdaD9Sc")
              }
            />
            <YearlyPackage
              title={"Pro Package"}
              fullPrice={"$499.99"}
              discountedPrice={"$599.99"}
              isStarter={false}
              handlePayment={() =>
                handlePayment("price_1OLuv2JOtdUfVp0DepUXJohp")
              }
            />
          </>
        )}
      </div>

      {showPostModal && <ModalPopup state={true} onClose={hideModal} />}
    </div>
  );
};

export default Packages;
