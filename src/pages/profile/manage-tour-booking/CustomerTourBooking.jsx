import React, { useEffect, useState } from "react";
import BookingCard from "../../../components/booking-template/BookingCard";
import { Divider, Pagination } from "antd";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CustomerTourBooking() {
  const [bookings, setBookings] = useState([]);

  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [current, setCurrent] = useState(1);
  const onChange = (value) => {
    setPage(value - 1);
    setCurrent(value);
  };

  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const fetchBooking = async () => {
    try {
      const response = await api.get(
        `booking/customerId?id=${user.code}&page=${page}&size=${2}`
      );

      setTotalElements(response.data.totalElements);
      setBookings(response.data.listData || []);

      console.log("response.data", response.data.listData);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [page]);

  return (
    <>
      <div className="cus-tourBooking-container">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => {
            const mapBooking = {
              id: booking.bookingId,
              openTourId: booking.tourId?.id,
              tourName: booking.tourId?.tourName,
              startDate: booking.tourId?.startDate,
              duration: booking.tourId?.duration,
              time: booking.tourId?.time,
              consulting: booking.tourId?.consultingName,
              fullName: booking.fullName,
              email: booking.email,
              phone: booking.phone,
              adult: booking.adult,
              child: booking.child,
              infant: booking.infant,
              image: booking.tourId?.image,
              status: booking.status,
            };

            return (
              <>
                <BookingCard
                  key={booking.bookingId}
                  booking={mapBooking}
                />

                <Divider />
              </>
            );
          })
        ) : (
          <p>You don't have any booking</p> // Message to display if no bookings
        )}

        <Pagination
          current={current}
          onChange={onChange}
          total={totalElements}
          pageSize={2}
        />
      </div>
    </>
  );
}

export default CustomerTourBooking;
