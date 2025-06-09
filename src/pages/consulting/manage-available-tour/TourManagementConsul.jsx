import React, { useEffect, useState } from "react";
import ConsulTourCard from "./ConsulTourCard";
import { Pagination, Divider } from "antd";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function TourManagementConsul() {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [current, setCurrent] = useState(1);

  const user = useSelector((store) => store.user);

  const onChange = (value) => {
    setPage(value - 1);
    setCurrent(value);
  };

  const fetchTours = async () => {
    try {
      const response = await api.get(
        `tour/consulting?consulId=${user.code}&page=${page}&size=2`
      );
      setTotalElements(response.data.totalElements);
      setTours(response.data.listData || []);
    } catch (error) {
      console.error("Error fetching tours:", error.message);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [page]);

  return (
    <div className="consul-tour-management-container">
      {tours && tours.length > 0 ? (
        tours.map((tour) => (
          <React.Fragment key={tour.tourId}>
            <ConsulTourCard tour={tour} />
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <p>No tours found for this consultant.</p>
      )}

      <Pagination
        current={current}
        onChange={onChange}
        total={totalElements}
        pageSize={2}
      />
    </div>
  );
}

export default TourManagementConsul;
