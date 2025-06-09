import React, { useEffect, useState } from "react";
import "./customerdetail.css";
import { Input, Card, Steps, Row, Col, Form, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TicketsOverview from "./TicketsOverview";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/axios";

const { Step } = Steps;

const CustomerBookingDetail = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = useSelector((store) => store.user);
  const [form] = Form.useForm();
  const { totalPrice, visitDate, time, adultCount, childCount, infantCount } =
    location.state;

  const handleBack = () => {
    navigate(`/tourbooking/${tourId}`, {
      state: {
        totalPrice,
        adultCount,
        childCount,
        infantCount,
      },
    });
  };

  const handleNextStep = () => {
    form.validateFields().then(async (information) => {
      navigate(`/tourpayment/${tourId}`, {
        state: {
          fullName: information.fullname,
          email: information.email,
          phone: information.telephone,
          totalPrice,
          adultCount,
          childCount,
          infantCount,
        },
      });
    });
  };

  useEffect(() => {
    if (userLoggedIn?.fullName) {
      form.setFieldsValue({
        fullname: userLoggedIn.fullName,
        telephone: userLoggedIn.phone,
        email: userLoggedIn.email,
      });
    }
  }, [userLoggedIn, form]);

  return (
    <div className="customer-booking-detail">
      <Button
        type="link"
        onClick={handleBack}
        className="back-button"
        style={{ marginBottom: "20px" }}
        icon={<LeftOutlined />}
      >
        Back
      </Button>
      <div
        className="steps-container"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <Steps current={1} style={{ marginBottom: "20px" }}>
          <Step title="Booking Details" />
          <Step title="Your Details" />
          <Step title="Check out" />
        </Steps>
      </div>
      <Row gutter={32}>
        <Col span={14} className="customer-details">
          <h2>Who shall we send these tickets to?</h2>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Full Name"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Telephone Number"
                  name="telephone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your telephone number",
                    },
                  ]}
                >
                  <Input placeholder="Enter your telephone number" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email address" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col span={10}>
          <TicketsOverview
            tourId={tourId}
            visitDate={visitDate}
            time={time}
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            totalPrice={totalPrice}
            onNextStep={handleNextStep}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CustomerBookingDetail;
