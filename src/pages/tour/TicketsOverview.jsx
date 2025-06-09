import React, { useEffect, useState } from "react";
import { Card, Image, Button, Flex } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import api from "../../config/axios";

import "./TicketOverview.scss";
import { CgSandClock } from "react-icons/cg";
import { PiFarm } from "react-icons/pi";

const TicketsOverview = ({
  tourId,
  adultCount,
  childCount,
  infantCount,
  totalPrice,
  onNextStep,
}) => {
  const [tourdetail, setTourDetail] = useState({});

  const fetchTour = async () => {
    try {
      const response = await api.get(`open-tour/${tourId}`);

      setTourDetail(response.data);
      console.log("Tour Detail", response.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  const formatNumber = (value) => {
    if (typeof value !== "number") return value;
    return `${value.toLocaleString("en-US")} VND`;
  };

  return (
    <Card
      title="Your Tickets Overview"
      bordered={false}
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="overview-details">
        <div className="tour-info">
          <Image
            width={300}
            height={200}
            src={tourdetail.image}
            alt="Tour Image"
            style={{ borderRadius: "10px" }}
          />
          <div className="tour-info-details">
            <h4>{tourdetail.tourName}</h4>
            <div className="info-icons">
              <p>
                <CalendarOutlined className="ticket-overview-icon" />{" "}
                {tourdetail.startDate}
              </p>
              <p>
                <ClockCircleOutlined className="ticket-overview-icon" />{" "}
                {tourdetail.time}
              </p>
              <p>
                <CgSandClock className="ticket-overview-icon" />{" "}
                {tourdetail.duration}
              </p>
              <p style={{ display: "flex", alignItems: "flex-start" }}>
                <PiFarm className="ticket-overview-icon" />
                <span className="farm-names">
                  {(tourdetail?.farmList || [])
                    .map((farm) => farm.farmName)
                    .join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="overview-pricing" style={{ marginTop: "20px" }}>
          <p style={{ marginBottom: "4px", fontSize: "15px", color: "#555" }}>
            <span>Adult (18+)</span> {adultCount}
          </p>
          <p style={{ marginBottom: "4px", fontSize: "15px", color: "#555" }}>
            <span>Child (6-17)</span> {childCount}
          </p>
          <p style={{ marginBottom: "8px", fontSize: "15px", color: "#555" }}>
            <span>Infant (0-5)</span> {infantCount}
          </p>
          <p style={{ marginBottom: "8px", fontSize: "15px", color: "#555" }}>
            <strong>Total price:</strong>{" "}
            <strong>{formatNumber(totalPrice)}</strong>
          </p>
        </div>
        {onNextStep && (
          <Button
            type="primary"
            className="next-step-button"
            style={{ marginTop: "20px" }}
            onClick={onNextStep}
          >
            Go to the Next Step
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TicketsOverview;
