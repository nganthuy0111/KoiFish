import React from "react";
import "./ConsulTourCard.scss";
import { Button, Divider, Flex, Image } from "antd";
import { CiCalendar } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { ClockCircleOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Format number function
const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return `${value.toLocaleString("en-US")} VND`;
};

function ConsulTourCard({ tour }) {
  const navigate = useNavigate();

  return (
    <div className="consul-tour-card-container">
      <div className="represent-tour-image">
        <Image
          width={"100%"}
          height={"100%"}
          preview={false}
          src={tour.image}
        />
      </div>

      <div className="tour-card-info">
        <div className="tour-card-id">
          <strong>{tour.tourId}</strong>
        </div>

        <div className="tour-card-detail">
          <div className="tour-detail">
            <Flex justify="center" style={{ marginBottom: 10 }}>
              <strong style={{ marginRight: 3 }}>Tour:</strong>
              <span className="tour-detail__text">{tour.tourName}</span>
            </Flex>

            <Flex justify="space-between">
              <div style={{ marginBottom: 10 }}>
                <Flex align="center">
                  <CiCalendar className="tour-detail__icon" />
                  <strong
                    className="tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Start Date:
                  </strong>
                  <span className="tour-detail__text">{tour.startDate}</span>
                </Flex>

                <Flex align="center">
                  <CgSandClock className="tour-detail__icon" />
                  <strong
                    className="tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Duration:
                  </strong>
                  <span className="tour-detail__text">{tour.duration}</span>
                </Flex>
              </div>

              <div>
                <Flex align="center">
                  <ClockCircleOutlined className="tour-detail__icon" />
                  <strong
                    className="tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Time:
                  </strong>
                  <span className="tour-detail__text">{tour.time}</span>
                </Flex>

                <Flex align="center">
                  <FaUser className="tour-detail__icon" />
                  <strong
                    className="tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Consultant ID:
                  </strong>
                  <span className="tour-detail__text">{tour.consultingId}</span>
                </Flex>
              </div>
            </Flex>
          </div>

          <div className="tour-pricing-detail">
            <Flex justify="space-around" style={{ marginBottom: 10 }}>
              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Price:</strong>
                <span className="tour-detail__text">
                  {formatNumber(tour.price)}
                </span>
              </Flex>

              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Adult Price:</strong>
                <span className="tour-detail__text">
                  {formatNumber(tour.perAdultPrice)}
                </span>
              </Flex>

              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Children Price:</strong>
                <span className="tour-detail__text">
                  {formatNumber(tour.perChildrenPrice)}
                </span>
              </Flex>
            </Flex>

            <Flex justify="center">
              <strong style={{ marginRight: 5 }}>Description:</strong>
              <span className="tour-detail__text">{tour.description}</span>
            </Flex>
          </div>
        </div>
        <Divider />
        <div className="tour-card-footer">
          <div>
            <span style={{ color: "#3CB371", fontWeight: "bold" }}>
              Tour Status: {tour.status}
            </span>
          </div>

          <div>
            <Button
              type="primary"
              onClick={() => navigate(`/consulting-active-trip`)}
            >
              View Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsulTourCard;
