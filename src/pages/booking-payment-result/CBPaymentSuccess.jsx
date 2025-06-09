import React, { useEffect } from "react";
import "./CBPaymentSuccess.scss";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useGetParams from "../../utils/hooks/useGetParams";
function CBPaymentSuccess() {
  const navigate = useNavigate();
  const getParam = useGetParams();
  const bookingID = getParam("bookingID");
  const vnp_TransactionStatus = getParam("vnp_TransactionStatus");

  const handlePaymentStatus = () => {
    if (vnp_TransactionStatus === "00") {
      //set booking status
      try {
        const response = api.put(
          `customBooking/setStatusAfterPayment?id=${bookingID}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      navigate("/customtour-payment-failed");
    }
  };

  useEffect(() => {
    handlePaymentStatus();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="bps-container">
        <div className="green-check-success">
          <FaCircleCheck />
        </div>

        <div className="bps-title">
          <h1>Payment Succeeded!</h1>
        </div>

        <div className="bps-notify">
          <span>Thank you for processing your most recent payment.</span>
          <br />
          <span>Your booking id is {bookingID}.</span>
        </div>

        <div className="bps-button-handle">
          <Button onClick={() => navigate("/profile/tour-booking")}>
            Your booking
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CBPaymentSuccess;
