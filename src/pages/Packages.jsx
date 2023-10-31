import React, { useState, useEffect } from "react";
import "../style/Packages.css";
import { FaCheck } from "react-icons/fa";
import ModelContent from "./ModelContent";
import { loadStripe } from "@stripe/stripe-js";

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

  const stripePromise = loadStripe(
    "pk_test_51NxxhdLCXkiJMpgWCfQxYaoJoAA8nesqmEs54DtqiemvgMVHAKzaJZ62PJFUyP5jIiIZx8GB2Xd5QJx1eEpqmnag000jkKcCHG"
  );

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1O6x9rLCXkiJMpgWMkemdXBh",
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: "https://www.google.com/",
      cancelUrl: "https://www.instagram.com/",
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
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
        <p>
          Cancel at any time. 100% no questions asked refunds. Message us for
          high volume custom pricing.
        </p>
        <div className="coming-soon">
          <span>Coming Soon....</span>
        </div>
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
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Starter Package</h4>
              <p style={{ color: "#6B7280" }}>To help you grow</p>
              <h2>
                $49 <span style={{ color: "#6B7280" }}>/mo</span>
              </h2>

              <p style={{ color: "#6B7280" }}>
                $39 / month if you sign up for a year
              </p>

              <button
                href="#"
                className="btn btn-primary plan"
                onClick={handlePayment}
              >
                Choose Plan
              </button>
              <hr />
              <div className="card-body">
                <h5>What's included</h5>
                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>30 posts</p>
                </div>

                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Less than 50 supported languages
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card  p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Pro Package</h4>
              <p style={{ color: "#6B7280" }}>To help you grow</p>
              <h2>
                $99 <span style={{ color: "#6B7280" }}>/mo</span>
              </h2>

              <p style={{ color: "#6B7280" }}>
                $88 / month if you sign up for a year
              </p>

              <button href="#" className="btn btn-primary plan">
                Choose Plan
              </button>
              <hr />
              <div className="card-body">
                <h5>What's included</h5>
                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Unlimited posts
                  </p>
                </div>

                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Over 100 supported languages
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card  p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Enterprise Package</h4>
              <p style={{ color: "#6B7280" }}>For Teams of 10+ Muse Users</p>

              <button
                // onClick={openModal}
                className="btn btn-primary plan"
              >
                Contact Us
              </button>

              {isModalOpen && (
                <Modal closeModal={closeModal}>
                  <ModelContent closeModal={closeModal} />
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}

      {activePlan === "Yearly" && (
        <div className="row d-flex flex-row justify-content-center w-100">
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Starter Package</h4>
              <p style={{ color: "#6B7280" }}>To help you grow</p>
              <h2>
                $468 <span style={{ color: "#6B7280" }}>/year</span>
                <span
                  style={{
                    color: "#d40000",
                    marginLeft: 20,
                    textDecoration: "line-through",
                  }}
                >
                  $588
                </span>
              </h2>

              <button href="#" className="btn btn-primary plan">
                Choose Plan
              </button>
              <hr />
              <div className="card-body">
                <h5>What's included</h5>
                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>30 posts</p>
                </div>

                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Less than 50 supported languages
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Pro Package</h4>
              <p style={{ color: "#6B7280" }}>To help you grow</p>
              <h2>
                $1056 <span style={{ color: "#6B7280" }}>/year</span>
                <span
                  style={{
                    color: "#d40000",
                    marginLeft: 20,
                    textDecoration: "line-through",
                  }}
                >
                  $1188
                </span>
              </h2>

              <button href="#" className="btn btn-primary plan">
                Choose Plan
              </button>
              <hr />
              <div className="card-body">
                <h5>What's included</h5>
                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Unlimited posts
                  </p>
                </div>

                <div
                  className="CheckSection"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <span>
                    <FaCheck className="check" size={20} />
                  </span>
                  <p style={{ margin: "0", color: "#6B7280" }}>
                    Over 100 supported languages
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ">
            <div
              className="card p-3"
              style={{
                textAlign: "left",
              }}
            >
              <h4>Enterprise Package</h4>
              <p style={{ color: "#6B7280" }}>For Teams of 10+ Muse Users</p>

              <button onClick={openModal} className="btn btn-primary plan">
                Contact Us
              </button>

              {isModalOpen && (
                <Modal closeModal={closeModal}>
                  <ModelContent closeModal={closeModal} />
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
