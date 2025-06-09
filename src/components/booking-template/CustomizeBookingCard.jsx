import React, { useEffect, useState } from "react";

import "./CustomizeBookingCard.scss";
import { Button, Flex, Image, Menu } from "antd";
import { CiCalendar } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { PiFarmBold } from "react-icons/pi";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CustomizeBookingCard({ customizeTour }) {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  const fetchFarms = () => {
    const getFarms = [];
    let count = 0;
    if (Array.isArray(customizeTour.farm) && customizeTour.farm.length > 0) {
      customizeTour.farm.forEach((farm) => {
        count++;
        getFarms.push({
          key: count,
          label: farm.farmName,
          type: "group",
        });
      });
    }

    setFarms(getFarms);
  };

  useEffect(() => {
    fetchFarms();
  }, [customizeTour]);

  const items = [
    {
      key: "sub1",
      label: (
        <Flex align="center" style={{ marginRight: 5 }}>
          <PiFarmBold className="cbc-tour-icon" />
          <strong>Farms:</strong>
        </Flex>
      ),
      children: farms,
    },
  ];

  const handleViewQuotation = (bookingId) => () => {
    navigate(`/customer-quotation/${bookingId}`);
  };
  return (
    <div className="cbc-container">
      <div className="cbc-tour-information">
        <span className="cbc-tour-title">Tour Information</span>
        <Flex align="flex-start" justify="space-between">
          <Flex vertical justify="space-between">
            <Flex style={{ marginBottom: 10 }} align="center">
              <CiCalendar className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Start date:</strong> {customizeTour.startDate}
              </span>
            </Flex>

            <Flex align="center">
              <CgSandClock className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Duration:</strong> {customizeTour.duration}
              </span>
            </Flex>
          </Flex>

          <Menu
            style={{
              width: 256,
            }}
            mode="vertical"
            items={items}
          />
        </Flex>
      </div>
      <div className="cbc-customer-information">
        <span className="cbc-customer-title">Customer contact</span>
        <Flex justify="space-between">
          <Flex vertical justify="space-between">
            <Flex align="center">
              <FaUser className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Full name:</strong> {customizeTour.fullName}
              </span>
            </Flex>

            <Flex align="center">
              <FaPhoneAlt className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Phone:</strong> {customizeTour.phone}
              </span>
            </Flex>
          </Flex>

          <Flex vertical justify="space-between">
            <Flex align="center">
              <IoIosMail className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Email:</strong> {customizeTour.email}
              </span>
            </Flex>

            <Flex align="center">
              <FaLocationDot className="cbc-tour-icon" />
              <span className="cbc-tour-text">
                <strong>Address:</strong> {customizeTour.address}
              </span>
            </Flex>
          </Flex>
        </Flex>

        <Flex justify="space-around">
          <strong>Adults: {customizeTour.adult}</strong>
          <strong>Children: {customizeTour.child}</strong>
          <strong>Infants: {customizeTour.infant}</strong>
        </Flex>
      </div>

      {customizeTour.status === "CANCEL" ? (
        <div className="cbc-button-handle">
          <span style={{ textAlign: "center", color: "red" }}>
            This booking has been cancelled
          </span>
        </div>
      ) : (
        <div className="cbc-button-handle">
          <Button
            style={{ backgroundColor: "#ff8a33" }}
            className="cbc-button-item"
            onClick={handleViewQuotation(customizeTour.cusBookingId)}
          >
            View quotation
          </Button>
          <Button
            style={{ backgroundColor: "#4caf50" }}
            className="cbc-button-item"
          >
            View schedule
          </Button>
          <Button
            style={{ backgroundColor: "#2196f3" }}
            className="cbc-button-item"
            onClick={() => navigate(`/customer-view-order-dream-tour/${customizeTour.cusBookingId}`)}
          >
            View fish order
          </Button>
          <span style={{ textAlign: "center" }}>
            <strong>Status:</strong> {customizeTour.status}
          </span>
        </div>
      )}
    </div>
  );
}

export default CustomizeBookingCard;
