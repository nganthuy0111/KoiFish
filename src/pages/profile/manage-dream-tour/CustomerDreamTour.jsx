import React, { useEffect, useState } from "react";
import CustomizeBookingCard from "../../../components/booking-template/CustomizeBookingCard";
import { useSelector } from "react-redux";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Pagination } from "antd";

function CustomerDreamTour() {
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [tours, setTours] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  const [current, setCurrent] = useState(3);
  const onChange = (value) => {
    setPage(value - 1);
    setCurrent(value);
  };

  const fetchCustomBooking = async () => {
    try {
      const response = await api.get(`customBooking/customer-id`, {
        params: { id: user.code, page: page, size: 2 },
      });
      const getTours = [];

      response.data.listData.map((tour) =>
        getTours.push(<CustomizeBookingCard customizeTour={tour} />)
      );
      setTours(getTours);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchCustomBooking();
  }, [page]);

  return (
    <div>
      {tours && tours.length > 0 ? (
        tours.map((tour) => tour)
      ) : (
        <p>
          You don't have any dream tour, or our staff is processing your
          booking.
        </p>
      )}

      {/* Pagination component */}
      <Pagination
        current={current}
        onChange={onChange}
        total={totalElements}
        pageSize={2}
      />
    </div>
  );
}

export default CustomerDreamTour;
