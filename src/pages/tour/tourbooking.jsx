import React, { useState } from "react";
import "./tourbooking.css";
import { Card, Steps, Row, Col, Button } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TicketsOverview from "./TicketsOverview";
import { useSelector } from "react-redux";

const { Step } = Steps;

const TourBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tourId } = useParams();
  const [adultCount, setAdultCount] = useState(location.state?.adultCount || 0);
  const [childCount, setChildCount] = useState(location.state?.childCount || 0);
  const [infantCount, setInfantCount] = useState(
    location.state?.infantCount || 0
  );

  const tour = useSelector((store) => store.tour);
  
  const totalPeople = adultCount + childCount + infantCount;

  const handleIncrement = (setter, value) => {
    if (totalPeople < 4) {
      setter(value + 1);
    } else {
      toast.error("Total number of people cannot exceed 4.");
    }
  };

  const handleDecrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const calculateTotalPrice = () => {
    return (
      adultCount * tour.perAdultPrice +
      childCount * tour.perChildrenPrice +
      tour.price
    );
  };

  const handleNextStep = () => {
    const totalPrice = calculateTotalPrice();
    navigate(`/customerdetail/${tourId}`, {
      state: {
        totalPrice,
        adultCount,
        childCount,
        infantCount,
      },
    });
  };

  return (
    <div className="tour-booking">
      <div
        className="steps-container"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <Steps current={0} style={{ marginBottom: "20px" }}>
          <Step title="Booking Details" />
          <Step title="Your Details" />
          <Step title="Check out" />
        </Steps>
      </div>

      <Row gutter={32}>
        <Col span={14} className="booking-details">
          <Card title="Select Your Tickets" bordered={false}>
            <div className="ticket-option">
              <div className="ticket-info">
                <p>Adult (18+)</p>
                <span>{tour.perAdultPrice} vnd / person</span>
              </div>
              <div className="ticket-controls">
                <Button
                  onClick={() => handleDecrement(setAdultCount, adultCount)}
                >
                  -
                </Button>
                <span>{adultCount}</span>
                <Button
                  onClick={() => handleIncrement(setAdultCount, adultCount)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="ticket-option">
              <div className="ticket-info">
                <p>Child (6-17)</p>
                <span>{tour.perChildrenPrice} vnd / person</span>
              </div>
              <div className="ticket-controls">
                <Button
                  onClick={() => handleDecrement(setChildCount, childCount)}
                >
                  -
                </Button>
                <span>{childCount}</span>
                <Button
                  onClick={() => handleIncrement(setChildCount, childCount)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="ticket-option">
              <div className="ticket-info">
                <p>Infant (0-5)</p>
                <span>FREE</span>
              </div>
              <div className="ticket-controls">
                <Button
                  onClick={() => handleDecrement(setInfantCount, infantCount)}
                >
                  -
                </Button>
                <span>{infantCount}</span>
                <Button
                  onClick={() => handleIncrement(setInfantCount, infantCount)}
                >
                  +
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={10}>
          <TicketsOverview
            tourId={tourId}
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            totalPrice={calculateTotalPrice()}
            onNextStep={handleNextStep}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TourBooking;
