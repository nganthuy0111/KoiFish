import React, { useEffect, useState } from "react";
import "./ConsultingViewBooking.scss";
import {
  Card,
  Avatar,
  Space,
  Typography,
  Divider,
  Button,
  Pagination,
  Flex,
  Popover,
  List,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { SiTripdotcom } from "react-icons/si";
import { IoIosArrowBack } from "react-icons/io";

const { Title, Text } = Typography;

function ConsultingViewActiveTour() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  console.log("booking", bookings);

  const fetchBookings = async () => {
    try {
      const response = await api.get(
        `booking/Consulting?consulId=${user.code}`
      );

      const sortedBookings = response.data.sort((a, b) => {
        if (a.openTour.status === "DONE" && b.openTour.status !== "DONE") {
          return 1;
        }
        if (a.openTour.status !== "DONE" && b.openTour.status === "DONE") {
          return -1;
        }
        return 0;
      });

      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleEndTrip = async (openTourId) => {
    try {
      const response = await api.put(`open-tour/endTrip/${openTourId}`);
      toast.info(response.data);
      fetchBookings();
    } catch (error) {
      console.error("Error ending trip");
    }
  };

  return (
    <Flex vertical align="center" style={{ padding: 30, width: "100vw" }}>
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
          onClick={() => navigate(`/consulting/tour`)}
        >
          <Flex align="center">
            <IoIosArrowBack /> Back
          </Flex>
        </span>
        <h1>Active Open Tour</h1>
      </Flex>
      {bookings.length > 0 ? (
        <div
          style={{
            width: "60%",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={bookings}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  padding: "16px 24px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "16px",
                  backgroundColor: "#fff",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: "middle",
                        fontSize: "18px",
                      }}
                      icon={<SiTripdotcom />}
                    />
                  }
                  title={
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {item.openTour.tourName}
                    </div>
                  }
                  description={
                    <div style={{ color: "#555", fontSize: "14px" }}>
                      Start Date: {item.openTour.startDate}
                    </div>
                  }
                />

                {item.openTour.status === "DONE" ? (
                  <Flex vertical align="center" justify="center">
                    <div>
                      <Button
                        type="primary"
                        onClick={() =>
                          navigate(
                            `/consulting-view-booking/${item.openTour.id}`
                          )
                        }
                        style={{ marginRight: 10 }}
                      >
                        View Booking
                      </Button>
                      <Button
                        type="primary"
                        danger
                        disabled
                        style={{
                          backgroundColor: "#d9d9d9",
                          borderColor: "#d9d9d9",
                          borderRadius: "6px",
                          fontWeight: "bold",
                        }}
                      >
                        End Trip
                      </Button>
                    </div>

                    <p
                      style={{
                        color: "#ff4d4f",
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      This trip has ended.
                    </p>
                  </Flex>
                ) : (
                  <div>
                    <Button
                      type="primary"
                      onClick={() =>
                        navigate(`/consulting-view-booking/${item.openTour.id}`)
                      }
                      style={{ marginRight: 10 }}
                    >
                      View Booking
                    </Button>
                    <Popover
                      content={
                        <Space align="center">
                          <Button
                            type="primary"
                            danger
                            style={{ width: "100px" }}
                            onClick={() => handleEndTrip(item.openTour.id)}
                          >
                            Yes
                          </Button>
                          <Button onClick={hide} style={{ width: "100px" }}>
                            No
                          </Button>
                        </Space>
                      }
                      title={
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                          Are you sure to end this trip?
                        </div>
                      }
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        type="primary"
                        danger
                        style={{
                          backgroundColor: "#ff4d4f",
                          borderColor: "#ff4d4f",
                          borderRadius: "6px",
                          fontWeight: "bold",
                        }}
                      >
                        End Trip
                      </Button>
                    </Popover>
                  </div>
                )}
              </List.Item>
            )}
          />
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No active open tour found.</p>
      )}
    </Flex>
  );
}

export default ConsultingViewActiveTour;
