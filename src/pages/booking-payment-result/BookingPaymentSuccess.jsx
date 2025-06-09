import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import "./BookingPaymentSuccess.scss";
import { Button, Steps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useGetParams from "../../utils/hooks/useGetParams";
import { toast } from "react-toastify";
import api from "../../config/axios";
const { Step } = Steps;

function BookingPaymentSuccess() {
  const navigate = useNavigate();
  const getParam = useGetParams();
  const bookingID = getParam("bookingID");
  const vnp_TransactionStatus = getParam("vnp_TransactionStatus");

  const handleDeleteBooking = async () => {
    try {
      const response = await api.delete(
        `booking/delete/bookingId?id=${bookingID}`
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const handlePaymentStatus = () => {
    if (vnp_TransactionStatus === "00") {
      //set booking status
      try {
        const response = api.put(
          `booking/setStatusAfterPayment?id=${bookingID}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      handleDeleteBooking();
      navigate("/tourpayment-failed");
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

export default BookingPaymentSuccess;
