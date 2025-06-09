import React, { useEffect, useState } from "react";
import "./ViewQuotation.scss";
import {
  Button,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
function ViewQuotation() {
  const { bookingId } = useParams();
  const [quotation, setQuotation] = useState();
  const [form] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "UNIT PRICE",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
  ];

  const datas = [
    {
      key: 1,
      description: "Tour price",
      unitPrice: `${quotation?.priceTour} vnd`,
    },

    {
      key: 2,
      description: "Adult",
      unitPrice: `${quotation?.adultPrice} vnd`,
    },

    {
      key: 3,
      description: "Children",
      unitPrice: `${quotation?.childPrice} vnd`,
    },

    {
      key: 4,
      description: "Infant",
      unitPrice: "0 vnd",
    },
  ];

  const fetchQuotation = async () => {
    try {
      const response = await api.get(`quotation/bookingCode?id=${bookingId}`);
      setQuotation(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, []);

  const confirm = () => {
    showModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelBooking = async (values) => {
    if (values === null) {
      values = "";
    }

    try {
      setLoading(true);
      const response = await api.post(
        `quotation/cancel?id=${quotation.quotationId}`,
        values.comment
      );

      toast.success("Successfully cancel this booking!");
      navigate("/profile/dream-tour-booking");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBooking = async () => {
    try {
      const response = await api.post(`customBooking/VNPay?id=${bookingId}`);
      window.location.href = response.data;
      toast.success("Processing payment!");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="quotation-container">
      {quotation && quotation.status === "APPROVE" ? (
        <>
          <div className="quotation-title">
            <div>
              <h2>QUOTATION</h2>
              <span>
                {dayjs(quotation.createAt).format("YYYY-MM-DD HH:mm")}
              </span>{" "}
              <br />
              <span>Ho Chi Minh City</span>
            </div>
            <Image width={70} height={70} src="/image/logo.svg" />
          </div>

          <div className="quotation-sending">
            <div className="sale-staff-info">
              <strong>From</strong>
              <span>{quotation.saleName}</span>
              <span>Sale staff of Koi Fish Tour Company</span>
            </div>

            <div className="customer-booking-info">
              <strong>To</strong>
              <span>{quotation.fullName}</span>
              <span>{quotation.phone}</span>
              <span>{quotation.email}</span>
            </div>

            <div className="relative-info">
              <div>
                <strong style={{ marginRight: 5 }}>Quotation ID:</strong>
                <span>{quotation.quotationId}</span>{" "}
              </div>

              <div>
                <strong style={{ marginRight: 5 }}>Booking ID:</strong>
                <span>{bookingId}</span>{" "}
              </div>
            </div>
          </div>

          <div className="table-of-content">
            <Table columns={columns} dataSource={datas} pagination={false} />
            <Divider />
            <div className="sumary-price">
              <Flex>
                <Flex vertical style={{ marginRight: 120 }}>
                  <strong>Total:</strong>
                </Flex>

                <Flex vertical>
                  <strong>{quotation.totalPrice} vnd</strong>{" "}
                </Flex>
              </Flex>

              <span className="quotation-signature">{quotation.saleName}</span>
            </div>
          </div>

          <Flex style={{ marginTop: 50 }}>
            <Space>
              {quotation.status === "CANCEL" ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  The quotation has been cancelled
                </div>
              ) : quotation.status === "APPROVE" ? (
                <>
                  <Button
                    onClick={handlePayBooking}
                    className="payment-buttons__button payment-buttons__button--payment"
                  >
                    Make payment
                  </Button>

                  <Popconfirm
                    title="Cancel quotation"
                    description="Are you sure to cancel?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="payment-buttons__button payment-buttons__button--cancel">
                      Cancel booking
                    </Button>
                  </Popconfirm>

                  <Button type="primary">
                    <Link to="/profile/dream-tour-booking">Back</Link>
                  </Button>
                </>
              ) : quotation.status === "PAID" ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  The quotation has been paid
                </div>
              ) : null}
            </Space>
          </Flex>
        </>
      ) : (
        <>
          <p>
            Thank you for your booking! We're currently preparing your
            quotation. Please hold on a moment.
          </p>

          <Button type="primary">
            <Link to="/profile/dream-tour-booking">Back</Link>
          </Button>
        </>
      )}
      {/* modal */}
      <Modal
        title="Let me know your experience"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} onFinish={handleCancelBooking}>
          <Form.Item name="comment">
            <Input placeholder="Enter your ideas!" />
          </Form.Item>

          <Button
            loading={loading}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              transition: "background-color 0.3s",
            }}
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            loading={loading}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewQuotation;
