import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConsultingBookingCard from "./ConsultingBookingCard";
import api from "../../../config/axios";
import { Flex, Radio } from "antd";
import { IoIosArrowBack } from "react-icons/io";

function ConsultingViewBooking() {
  const { openTourId } = useParams();
  const [displayBooking, setDisplayBooking] = useState([]);
  const [filteredBooking, setFilteredBooking] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "no-order", "has-order"
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const response = await api.get(`open-tour/bookings/${openTourId}`);
      setDisplayBooking(response.data);
      setFilteredBooking(response.data); // Default to show all bookings
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  const fetchOrder = async (bookingId) => {
    try {
      const response = await api.get(`order/booking/${bookingId}`);
      return response.data; // Return the order data
    } catch (error) {
      return null; // Return null if no order
    }
  };

  const filterBookings = async (selectedFilter) => {
    if (selectedFilter === "all") {
      setFilteredBooking(displayBooking);
    } else {
      const bookingsWithOrderInfo = await Promise.all(
        displayBooking.map(async (booking) => {
          const order = await fetchOrder(booking.bookingId);
          return { ...booking, hasOrder: !!order };
        })
      );

      if (selectedFilter === "no-order") {
        setFilteredBooking(
          bookingsWithOrderInfo.filter((booking) => !booking.hasOrder)
        );
      } else if (selectedFilter === "has-order") {
        setFilteredBooking(
          bookingsWithOrderInfo.filter((booking) => booking.hasOrder)
        );
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings(filter);
  }, [filter, displayBooking]);

  return (
    <div>
      <Flex
        style={{
          position: "relative",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "50px",
            fontSize: "16px",
            cursor: "pointer",
            color: "#1890ff",
          }}
          onClick={() => navigate(`/consulting-active-trip`)}
        >
          <Flex align="center">
            <IoIosArrowBack /> Back
          </Flex>
        </span>
        <h1>Customer Booking</h1>
      </Flex>

      {/* Radio Buttons for Filtering */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
          <Radio value="all">All</Radio>
          <Radio value="no-order">No Fish Order</Radio>
          <Radio value="has-order">Have Fish Order</Radio>
        </Radio.Group>
      </div>

      {/* Display Bookings */}
      {filteredBooking.length > 0 ? (
        filteredBooking.map((booking) => (
          <ConsultingBookingCard
            key={booking.id}
            booking={booking}
            openTourId={openTourId}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No booking available</p>
      )}
    </div>
  );
}

export default ConsultingViewBooking;
