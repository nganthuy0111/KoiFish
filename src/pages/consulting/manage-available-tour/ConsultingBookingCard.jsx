import React, { useEffect, useState } from "react";
import "./ConsultingViewBooking.scss";
import { Card, Avatar, Space, Typography, Divider, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axios";

const { Title, Text } = Typography;

function ConsultingBookingCard({ booking, openTourId }) {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`order/booking/${booking.bookingId}`);
      setOrder(response.data);
    } catch (error) {
      setOrder(null);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Card
      key={booking.bookingId}
      style={{
        width: "80vw",
        margin: "20px auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left Column: Customer Information */}
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Avatar
              src={booking.account.image || "https://via.placeholder.com/64"}
              size={64}
              style={{ marginRight: "10px" }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {booking.account.fullName}
            </Title>
          </div>
          <Space direction="vertical" size="small">
            <Text>
              <strong>Phone:</strong> {booking.account.phone}
            </Text>
            <Text>
              <strong>Email:</strong> {booking.account.email}
            </Text>
            <Text>
              <strong>Address:</strong> {booking.account.address}
            </Text>
          </Space>
        </div>

        <Divider type="vertical" style={{ height: "auto" }} />

        {/* Middle Column: Booking Information */}
        <div style={{ flex: 1, paddingLeft: "10px", paddingRight: "10px" }}>
          <Title level={5} style={{ marginBottom: 10 }}>
            Booking Details
          </Title>
          <Space direction="vertical" size="small">
            <Text>
              <strong>Booking ID:</strong> {booking.bookingId}
            </Text>
            <Text>
              <strong>Price:</strong> {booking.price.toLocaleString("en-US")}{" "}
              VND
            </Text>
            <Text>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.bookingDate).toISOString().split("T")[0]}
            </Text>
            <Text>
              <strong>Guests:</strong> {booking.adult} Adult(s), {booking.child}{" "}
              Child(ren), {booking.infant} Infant(s)
            </Text>
          </Space>
        </div>

        <Divider type="vertical" style={{ height: "auto" }} />

        {/* Right Column: Action Button */}
        <div
          style={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            type="primary"
            block
            onClick={() =>
              navigate(`/consulting-add-order/${booking.bookingId}`, {
                state: {
                  customerId: booking.account.id,
                  openTourId: openTourId,
                },
              })
            }
          >
            Manage Order
          </Button>

          {order ? (
            <p style={{ color: "red" }}>Fish order added.</p>
          ) : (
            <p style={{ color: "red" }}>No fish order.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ConsultingBookingCard;
