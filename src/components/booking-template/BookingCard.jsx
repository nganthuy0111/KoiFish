import React, { useEffect, useState } from "react";
import "./BookingCard.scss";
import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  Form,
  Input,
  Rate,
  message,
} from "antd";
import { CiCalendar } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { ClockCircleOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import { toast } from "react-toastify";

function BookingCard({ booking }) {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [feedback, setFeedback] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchFeedback = async () => {
    try {
      const response = await api.get(
        `feedback/bookingId?bookingId=${booking.id}`
      );
      setFeedback(response.data);
    } catch (error) {
      setFeedback(null);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const openFeedbackModal = () => {
    if (feedback) {
      toast.error("You have already given feedback for this booking.");
      return;
    } else {
      setIsFeedbackModalOpen(true);
    }
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    form.resetFields();
  };

  const handleFeedbackSubmit = async (values) => {
    const feedback = {
      comment: values.comment,
      rating: values.rating,
      accountId: user.id,
      bookingId: booking.id,
    };
    try {
      const response = await api.post("feedback", feedback);
      message.success("Thank you for your feedback!");
      fetchFeedback();
    } catch (error) {
      message.error("Something went wrong. Please try again later.");
    } finally {
      closeFeedbackModal();
    }
  };

  const handleViewSchedule = async () => {
    try {
      const response = await api.get(
        `open-tour/schedule/${booking.openTourId}`
      );
      window.open(response.data, "_blank");
    } catch (error) {
      console.error("Error fetching schedule:", error.message);
    }
  };

  return (
    <div className="booking-card-container">
      <div className="represent-booking-image">
        <Image
          width={"100%"}
          height={"100%"}
          preview={false}
          src={booking.image}
        />
      </div>

      <div className="booking-card-info">
        <div className="booking-card-id">
          <strong>{booking.id}</strong>
        </div>

        <div className="booking-card-detail">
          <div className="bkc-tour-detail">
            <Flex justify="center" style={{ marginBottom: 10 }}>
              <strong style={{ marginRight: 3 }}>Tour:</strong>
              <span className="bkc-tour-detail__text">{booking.tourName}</span>
            </Flex>

            <Flex justify="space-between">
              <div style={{ marginBottom: 10 }}>
                <Flex align="center">
                  <CiCalendar className="bkc-tour-detail__icon" />
                  <strong
                    className="bkc-tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Start Date:
                  </strong>
                  <span className="bkc-tour-detail__text">
                    {booking.startDate}
                  </span>
                </Flex>

                <Flex align="center">
                  <CgSandClock className="bkc-tour-detail__icon" />
                  <strong
                    className="bkc-tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Duration:
                  </strong>
                  <span className="bkc-tour-detail__text">
                    {booking.duration}
                  </span>
                </Flex>
              </div>

              <div>
                <Flex align="center">
                  <ClockCircleOutlined className="bkc-tour-detail__icon" />
                  <strong
                    className="bkc-tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Time:
                  </strong>
                  <span className="bkc-tour-detail__text">{booking.time}</span>
                </Flex>

                {/* <Flex align="center">
                  <FaUser className="bkc-tour-detail__icon" />
                  <strong
                    className="bkc-tour-detail__text"
                    style={{ marginRight: 5 }}
                  >
                    Consultant:
                  </strong>
                  <span className="bkc-tour-detail__text">
                    {booking.consulting}
                  </span>
                </Flex> */}
              </div>
            </Flex>
          </div>

          <div className="bkc-customer-detail">
            <Flex justify="center" style={{ marginBottom: 10 }}>
              <strong>Customer information:</strong>{" "}
            </Flex>

            <Flex justify="space-between">
              <div style={{ marginBottom: 10 }}>
                <Flex align="center">
                  <strong style={{ marginRight: 5 }}>Full name:</strong>
                  <span className="bkc-tour-detail__text">
                    {booking.fullName}
                  </span>
                </Flex>

                <Flex align="center">
                  <strong style={{ marginRight: 5 }}>Email:</strong>
                  <span className="bkc-tour-detail__text">{booking.email}</span>
                </Flex>
              </div>

              <div style={{ marginBottom: 10 }}>
                <Flex align="center">
                  <strong style={{ marginRight: 5 }}>Phone:</strong>
                  <span className="bkc-tour-detail__text">{booking.phone}</span>
                </Flex>
              </div>
            </Flex>

            <Flex justify="space-around">
              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Adult:</strong>
                <span className="bkc-tour-detail__text">{booking.adult}</span>
              </Flex>

              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Children:</strong>
                <span className="bkc-tour-detail__text">{booking.child}</span>
              </Flex>

              <Flex align="center">
                <strong style={{ marginRight: 5 }}>Infant:</strong>
                <span className="bkc-tour-detail__text">{booking.infant}</span>
              </Flex>
            </Flex>
          </div>
        </div>
        <Divider />
        <div className="booking-card-footer">
          <div>
            <span style={{ color: "#3CB371", fontWeight: "bold" }}>
              Your booking has been paid successfully
            </span>
            <br />
            <span style={{ color: "#DC143C" }}>
              *Our staff will support to buy fish and update your order after
              the tour
            </span>
          </div>

          <Flex vertical gap={10}>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <Button
                type="primary"
                style={{
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
                onClick={() => navigate(`/customer-view-order/${booking.id}`)}
              >
                View Order
              </Button>

              <Button
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontWeight: "500",
                }}
                onClick={handleViewSchedule}
              >
                View Schedule
              </Button>
            </div>

            {booking.status === "DONE" && (
              <Button
                type="primary"
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#ffd700",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
                onClick={openFeedbackModal}
              >
                Give Feedback
              </Button>
            )}
          </Flex>
        </div>
      </div>

      {/* Feedback Modal */}
      <Modal
        title="Give Feedback"
        open={isFeedbackModalOpen}
        onCancel={closeFeedbackModal}
        footer={null}
      >
        <Form form={form} onFinish={handleFeedbackSubmit} layout="vertical">
          <Form.Item
            name="rating"
            rules={[
              { required: true, message: "Please rate your experience!" },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[
              { required: true, message: "Please enter your comment!" },
              { min: 10, message: "Comment must be at least 10 characters!" },
              { max: 150, message: "Comment must be at most 150 characters!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter your feedback..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BookingCard;
