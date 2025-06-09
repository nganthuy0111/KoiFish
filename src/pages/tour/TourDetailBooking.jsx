import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Card, Image } from "antd";
import React from "react";

function TourDetailBooking() {
  return (
    <Card title="Your Tickets Overview" bordered={false}>
      <div className="overview-details">
        <div className="tour-info">
          <Image
            width={300}
            height={150}
            src="./image/homepage-background.svg"
            alt="Wine tasting in Tuscany"
            style={{ borderRadius: "10px", marginRight: "15px" }}
          />
          <div style={{ marginLeft: "30px" }}>
            <h4>Wine tasting In Tuscany</h4>
            <p>
              <CalendarOutlined /> FRI, 23 DEC 2022
            </p>
            <p>
              <ClockCircleOutlined /> 15:00
            </p>
          </div>
        </div>
        <div className="overview-pricing">
          <p>
            <span>Adult (18+)</span> €64.00
          </p>
          <p>
            <span>Child (6-17)</span> €22.00
          </p>
          <p>
            <span>Infant (0-5)</span> €0.00
          </p>
          <h4>Total Price</h4>
          <p className="total-price">€86.00</p>
        </div>
        <Button
          type="primary"
          className="next-step-button"
          onClick={() => navigate("/tourpayment")}
        >
          Go to the Next Step
        </Button>
      </div>
    </Card>
  );
}

export default TourDetailBooking;
