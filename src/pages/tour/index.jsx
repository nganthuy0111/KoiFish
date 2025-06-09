import React, { useEffect, useState } from "react";
import "./index.css";
import TourCard from "../../components/tour-card/TourCard";
import { Col, Pagination, Row } from "antd";
import api from "../../config/axios";

function TourPackages() {
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [tours, setTours] = useState([]);

  const [current, setCurrent] = useState(1);
  const onChange = (value) => {
    setPage(value - 1);
    setCurrent(value);
  };

  const fetchTours = async () => {
    try {
      const response = await api.get(`open-tour/guest/get?page=${page}&size=8`);
      console.log("response", response.data);
      setTotalElements(response.data.totalElements);

      const mapTour = [];
      response.data.listData.map((tour) => {
        mapTour.push(
          <Col key={tour.id} span={6}>
            {" "}
            <TourCard
              key={tour.id}
              tourId={tour.id}
              image={tour.image}
              title={tour.tourName}
              description={tour.description}
            />
          </Col>
        );
      });
      setTours(mapTour);
    } catch (error) {
      console.error("Error fetching tours:", error.message);
    }
  };

  useEffect(() => {
    fetchTours();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="tour-packages-container">
      <h1 className="tour-packages-title">Tour Packages</h1>
      <Row gutter={[20, 16]}>
        {tours && tours.length > 0
          ? tours.map((tour) => tour)
          : "No tours found"}
      </Row>

      <Pagination
        style={{ marginTop: 20 }}
        current={current}
        onChange={onChange}
        total={totalElements}
        pageSize={8}
      />
    </div>
  );
}

export default TourPackages;
