import React from "react";
import "./BookingPaymentFailed.scss";
import { ImSad } from "react-icons/im";
import { Button, Steps } from "antd";
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

function BookingPaymentFailed() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="steps-container"
        style={{ maxWidth: "500px", margin: "0 auto", marginBottom: "20px" }}
      >
        <Steps current={2}>
          <Step title="Booking Details" />
          <Step title="Your Details" />
          <Step title="Check out" />
        </Steps>
      </div>

      <div className="bpf-container">
        <div className="bpf-failed-icon">
          <ImSad />
        </div>

        <div className="bpf-title">
          <h1>Payment Failed!</h1>
        </div>

        <div className="bpf-notify">
          <span>
            Sorry, we are not able to process your payment at the moment.
          </span>
          <br />
          <span>Let try again.</span>
        </div>

        <div className="bpf-button-handle">
          <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
      </div>
    </div>
  );
}

export default BookingPaymentFailed;
