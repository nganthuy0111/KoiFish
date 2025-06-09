import React, { useState } from "react";
import "./tourpayment.css";
import { Button, Divider, Flex, Image, Radio, Space, Steps } from "antd";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TicketsOverview from "./TicketsOverview";
import { LeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import api from "../../config/axios";

const { Step } = Steps;

const TourPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = useSelector((store) => store.user);
  const {
    totalPrice,
    fullName,
    email,
    phone,
    adultCount,
    childCount,
    infantCount,
  } = location.state;
  const { tourId } = useParams();

  const handleBack = () => {
    navigate(`/customerdetail/${tourId}`, {
      state: {
        totalPrice,
        adultCount,
        childCount,
        infantCount,
      },
    });
  };

  const [method, setMethod] = useState(null);
  const [methodMessage, setMethodMessage] = useState(null);

  const onChange = (e) => {
    setMethod(e.target.value);
  };

  const handleCreateBooking = async () => {
    const booking = {
      price: totalPrice,
      email: email,
      phone: phone,
      fullName: fullName,
      adult: adultCount,
      child: childCount,
      infant: infantCount,
      customerId: userLoggedIn.code,
      openTourId: tourId,
    };

    try {
      const response = await api.post("booking", booking);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong!");
      return null;
    }
  };

  const handleVnPay = async () => {
    const booking = await handleCreateBooking();

    setTimeout(async () => {
      if (booking) {
        try {
          const response = await api.post(
            `booking/VNPay?id=${booking.bookingId}`
          );

          const vnpayWindow = window.open(response.data, "_blank");

          const checkWindowClosed = setInterval(async () => {
            if (vnpayWindow.closed) {
              clearInterval(checkWindowClosed);

              // delete redundant booking
              try {
                const response = await api.delete(
                  `booking/delete/bookingId?id=${booking.bookingId}`
                );
              } catch (error) {
                toast.error("Something went wrong!");
              }
            }
          }, 1000);
        } catch (error) {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Cannot access booking to VNPay!");
      }
    }, 1000);
  };

  const handleSubmitBooking = async () => {
    switch (method) {
      case "vnpay":
        await handleVnPay();
        break;
      default:
        toast.error("Invalid payment method!");
        break;
    }
  };

  return (
    <div className="tour-payment">
      <Button
        type="link"
        onClick={handleBack}
        className="back-button"
        style={{ marginBottom: "20px" }}
        icon={<LeftOutlined />}
      >
        Back
      </Button>
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

      <div className="checkout-container">
        <div
          style={{
            width: "35%",
            border: "1px solid gray",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            padding: "0 15px",
            paddingBottom: 25,
          }}
        >
          <h2>Payment Method</h2>
          <h4>How would you like to pay?</h4>
          <Radio.Group onChange={onChange} className="method-container">
            <Flex justify="space-between">
              <Radio value="vnpay" className="method-item">
                <span className="method-label">Vn Pay</span>
              </Radio>
              <Image width={55} src="/image/vnpay-logo.png" preview={false} />
            </Flex>
            <Divider />
          </Radio.Group>

          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={handleSubmitBooking}
          >
            Submit
          </Button>

          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TourPayment;
