import { Card, Col, Row, Pagination } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./allFarm.css";
import useRealtime from "../../hooks/useRealTime.jsx";

function FarmPackages() {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 0,
  });

  const fetchAllFarm = async (page, pageSize) => {
    try {
      const response = await api.get(
        `farm/guest/get?page=${page - 1}&size=${pageSize}`
      );
      const { totalElements, listData } = response.data;
      const filteredData = (listData || response.data).filter(
        (item) => !item.deleted
      );
      setDatas(filteredData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (err) {
      toast.error(err.response.data || "Error fetching farms");
    }
  };

  useEffect(() => {
    fetchAllFarm(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  return (
    <div className="full_body">
      <div className="tour__body">
        <Row gutter={[16, 16]} justify="center">
          {datas.map((farm) => (
            <Col key={farm.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt="farm"
                    src={farm.image}
                    style={{ width: "100%", height: 150, objectFit: "cover" }}
                  />
                }
                className="farm-card"
                style={{ height: "100%", overflow: "hidden" }}
              >
                <Card.Meta
                  title={
                    <div style={{ fontWeight: "bold" }}>{farm.farmName}</div>
                  }
                  description={
                    <div
                      style={{
                        maxHeight: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div>{`Owner: ${farm.owner}`}</div>
                      <div>{farm.description}</div>
                    </div>
                  }
                />
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <Link to={`/farmDetail/${farm.id}`} className="linkDetails">
                    {/* <Link type="primary" style={{ color: "orange" }}> */}
                      Read More <ArrowRightOutlined />
                    {/* </Link> */}
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Pagination
          style={{ textAlign: "center", marginTop: 24 }}
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          showSizeChanger
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default FarmPackages;
