import React, { useEffect, useState } from "react";
import {
  Form,
  Checkbox,
  Button,
  InputNumber,
  Divider,
  DatePicker,
  Input,
  Row,
  Col,
} from "antd";
import "./customtour.css";
import api from "../../config/axios";
import {
  ClockCircleOutlined,
  FileSearchOutlined,
  HeartOutlined,
  LockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { toast } from "react-toastify";

const CustomTour = () => {
  const [farms, setFarms] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [form] = Form.useForm();

  const fetchFarms = (page) => {
    api
      .get("farm/guest/get", { params: { page: page, size: pageSize } })
      .then((response) => {
        setFarms(response.data.listData);
        setTotalElements(response.data.totalElements);
      })
      .catch((error) => {
        console.error("Error fetching farms:", error);
      });
  };

  useEffect(() => {
    fetchFarms(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onFinish = async (values) => {
    if (values.startDate) {
      const startDate = values.startDate.format("YYYY-MM-DD");

      const formData = {
        startDate: startDate,
        duration: values.duration + " days",
        email: values.email,
        phone: values.phone,
        fullName: values.fullName,
        address: values.address,
        budget: values.budget,
        adult: values.adult,
        child: values.child,
        infant: values.infant,
        farm: values.farms,
      };

      try {
        const response = await api.post("customTour", formData);
        console.log(response.data);
        toast.success("Your information has been submitted!");
        form.resetFields();
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to submit the form. Please try again.");
      }
    } else {
      console.error("Please select a travel date.");
    }
  };

  return (
    <div className="customtour-container">
      <div className="customtour-left-section">
        <h1 className="customtour-main-title">Inquiry Form</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2em",
            color: "#2f4f4f",
          }}
        >
          Koi Fish Tour 99 is a personalized travel service. Please provide
          detailed information; we will design a tailor-made journey for you.
        </p>

        <Divider className="customtour-divider" />
        <h1 className="customtour-section-title">Your Dream Trip</h1>
        <Form
          form={form}
          layout="vertical"
          className="customtour-form"
          onFinish={onFinish}
        >
          <Form.Item
            label="Farm available:"
            name="farms"
            rules={[
              { required: true, message: "Please select at least one farm" },
            ]}
          >
            <Checkbox.Group className="customtour-checkbox-group">
              {farms.map((farm) => (
                <Checkbox key={farm.id} value={farm.farmId}>
                  {farm.farmName}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="startDate"
                label="When would you like to travel?"
                rules={[
                  {
                    required: true,
                    message: "Please select a travel date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Date"
                  format="YYYY-MM-DD"
                  className="customtour-date-picker"
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current < moment().endOf("day").add(7, "days")
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Number of nights:"
                name="duration"
                rules={[
                  { required: true, message: "Please enter number of nights" },
                  {
                    type: "number",
                    min: 3,
                    message: "Please enter at least 3 nights",
                  },

                  {
                    type: "number",
                    max: 7,
                    message: "Please enter maximum 7 nights",
                  },
                ]}
              >
                <InputNumber
                  step={1}
                  placeholder="Enter number of nights"
                  className="customtour-input-number"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Budget"
            name="budget"
            rules={[
              { required: true, message: "Please enter your budget" },
              {
                type: "number",
                min: 10000000,
                message: "Budget have to be at least 10,000,000 VND",
              },
            ]}
          >
            <InputNumber
              step={1000000}
              className="customtour-input-number"
              placeholder="Enter your budget in VND"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div className="customtour-guests-group">
            <Form.Item
              label="Number of Adults"
              name="adult"
              rules={[
                {
                  required: true,
                  message: "Please enter the number of adults",
                },

                {
                  type: "number",
                  min: 1,
                  message: "Adults must be at least 1 person",
                },
              ]}
            >
              <InputNumber
                defaultValue={0}
                placeholder="e.g 3,7,10"
                className="customtour-guest-input"
              />
            </Form.Item>

            <Form.Item
              label="Number of Childrens"
              name="child"
              initialValue={0}
            >
              <InputNumber
                defaultValue={0}
                placeholder="e.g 3,7,10"
                className="customtour-guest-input"
              />
            </Form.Item>

            <Form.Item label="Number of Infants" name="infant" initialValue={0}>
              <InputNumber
                defaultValue={0}
                placeholder="e.g 3,7,10"
                className="customtour-guest-input"
              />
            </Form.Item>
          </div>

          <Divider className="customtour-divider" />
          <h1 className="customtour-section-title">Your Details</h1>
          <LockOutlined
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "35px",
            }}
          />
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "15px",
            }}
          >
            Your information is protected!
          </p>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Full Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter your address" },
              { min: 5, message: "Address must be at least 5 characters" },
            ]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <p
              style={{
                textAlign: "center",
                fontStyle: "italic",
                color: "#2f4f4f",
              }}
            >
              The “Inquire Now” button will be activated once all of the
              required fields are completed
            </p>
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ width: "500px", height: "40px" }}
              type="primary"
              htmlType="submit"
              className="customtour-submit-button"
            >
              <strong>INQUIRE NOW</strong>
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="customtour-right-section">
        <div className="customtour-difference-section">
          <h2 className="customtour-difference-title">
            The Koi Fish Tour 99 Difference
          </h2>
          <div className="customtour-difference-item">
            <div className="customtour-difference-icon">
              <FileSearchOutlined style={{ fontSize: "30px" }} />
            </div>
            <p>We are driven by detail</p>
          </div>
          <div className="customtour-difference-item">
            <div className="customtour-difference-icon">
              <ClockCircleOutlined style={{ fontSize: "30px" }} />
            </div>
            <p>We are always at your service</p>
          </div>
          <div className="customtour-difference-item">
            <div className="customtour-difference-icon">
              <TeamOutlined style={{ fontSize: "30px" }} />
            </div>
            <p>We provide the best tour guides</p>
          </div>
          <div className="customtour-difference-item">
            <div className="customtour-difference-icon">
              <HeartOutlined style={{ fontSize: "30px" }} />
            </div>
            <p>We give back</p>
          </div>
        </div>
        <Divider className="customtour-divider" />
        <h2 className="customtour-section-title">How it works</h2>
        <div className="customtour-how-it-works">
          <div className="customtour-how-item">
            <div className="customtour-how-number">1</div>
            <p>Tell us what your dream trip</p>
          </div>
          <div className="customtour-how-item">
            <div className="customtour-how-number">2</div>
            <p>Let us take care of the details</p>
          </div>
          <div className="customtour-how-item">
            <div className="customtour-how-number">3</div>
            <p>Fine-tune your itinerary</p>
          </div>
          <div className="customtour-how-item">
            <div className="customtour-how-number">4</div>
            <p>Book with confidence</p>
          </div>
          <div className="customtour-how-item">
            <div className="customtour-how-number">5</div>
            <p>Enjoy your trip!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTour;
