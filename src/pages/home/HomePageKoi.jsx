import React, { useEffect, useState } from "react";
import "./HomePageKoi.css";
import FishCard from "../../components/homePage-FishCard/FishCard";
import api from "../../config/axios";
import { Col, Pagination, Row } from "antd";

function HomePageKoi() {
  const [koiFish, setKoiFish] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [current, setCurrent] = useState(1);
  const onChange = (value) => {
    setPage(value - 1);
    setCurrent(value);
  };

  const fetchKoiFish = async () => {
    try {
      const response = await api.get(`koi/guest/get`, {
        params: { page: page, size: 8 },
      });
      setTotalElements(response.data.totalElements);
      const mapFish = [];
      response.data.listData.map((koi) =>
        mapFish.push(<FishCard key={koi.id} koiFish={koi} />)
      );
      setKoiFish(mapFish);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKoiFish();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hp-koiFish-container">
      <h1>Best Koi Fishes From Our Farm System</h1>
      <div className="hp-koiFish-list">
        <Row gutter={[30, 30]}>
          {koiFish.map((fish) => (
            <Col key={fish.id} span={6}>
              {fish}
            </Col>
          ))}
        </Row>

        <Pagination
          style={{ marginTop: "20px" }}
          current={current}
          onChange={onChange}
          total={totalElements}
          pageSize={8}
        />
      </div>
    </div>
  );
}

export default HomePageKoi;
