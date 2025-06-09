import { Button, Col, Divider, Flex, Image, Row, Space } from "antd";
import React from "react";

import "./TourResultTemplate.scss";
import { MdOutlineCalendarMonth, MdOutlinePlace } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function TourResultTemplate({
  tourId,
  openTourId,
  image,
  tourName,
  startDate,
  time,
  duration,
  farms,
  price,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewTour = async () => {
    navigate(`/tourdetail/${openTourId}`);
  };

  const formatNumber = (value) => {
    if (typeof value !== "number") return value;
    return `${value.toLocaleString("en-US")} VND`;
  };
  return (
    <>
      <Row className="result-container" style={{ height: "30vh" }}>
        <Col
          span={6}
          style={{ height: "100%" }}
          className="image-container result-element"
        >
          <Image
            width="100%"
            height="100%"
            src={image}
            className="result-image"
          />
        </Col>
        <Col span={12} className="information-container result-element">
          <h2>{tourName}</h2>
          <div className="detail-container">
            <Row>
              <Col span={12}>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={2}>
                    <MdOutlineCalendarMonth className="detail-icon" />
                  </Col>

                  <Col span={22}>
                    <span>
                      <b>Date: </b>
                      <span style={{ fontSize: "14px" }}>{startDate}</span>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col span={2}>
                    <CiClock2 className="detail-icon" />
                  </Col>

                  <Col span={22}>
                    <span>
                      <b>Time: </b>
                      <span style={{ fontSize: "14px" }}>{time}</span>
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={2}>
                    <CgSandClock className="detail-icon" />
                  </Col>

                  <Col span={22}>
                    <span>
                      <b>Duration: </b>
                      <span style={{ fontSize: "14px" }}>{duration}</span>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={2}>
                    <MdOutlinePlace className="detail-icon" />
                  </Col>

                  <Col span={22}>
                    <span>
                      <b>Farm: </b>
                      {farms.map((farm, index) => (
                        <span key={index} style={{ fontSize: "14px" }}>
                          {farm.farmName},{" "}
                        </span>
                      ))}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={6} className="submit-container result-element">
          <span>
            from <b>{formatNumber(price)}</b>
          </span>

          <div className="button-handle">
            <Button
              style={{
                border: "none",
                color: "white",
                backgroundColor: "#ff8a33",
              }}
              type="text"
              onClick={handleViewTour}
            >
              View detail
            </Button>
          </div>
        </Col>
      </Row>
      <Divider />
    </>
  );
}

export default TourResultTemplate;
