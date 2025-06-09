import React, { useEffect, useState } from "react";
import "./CustomerFishOrder.scss";

import { Avatar, Button, Flex, Form, List, Popover } from "antd";
import { CiEdit } from "react-icons/ci";
import api from "../../../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

function CustomerFishOrder() {
  const [order, setOrder] = useState(null);
  const [confirmPopoverVisible, setConfirmPopoverVisible] = useState(false);
  const [cancelPopoverVisible, setCancelPopoverVisible] = useState(false);

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await api.get(`order/booking/${bookingId}`);
      setOrder(response.data);
      console.log("order", response.data);
    } catch (error) {
      setOrder(null);
      toast.error("You don't have any fish order.");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [bookingId]);

  const handleConfirm = async () => {
    try {
      const response = await api.put(`order/confirm/${order.id}`);
      toast.success("Order confirmed successfully");
      setConfirmPopoverVisible(false);
      fetchOrder();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleCancel = async (notes) => {
    try {
      const response = await api.put(
        `order/cancel/${order.id}`,
        JSON.stringify(notes),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order cancelled successfully");
      setCancelPopoverVisible(false);
      fetchOrder();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const data = order?.shoppingCarts || [];

  if (!order) {
    return (
      <Flex vertical align="center">
        <h1>You don't have any fish order.</h1>
        <Button
          type="primary"
          onClick={() => navigate("/profile/tour-booking")}
        >
          Back to booking
        </Button>
      </Flex>
    );
  }

  return (
    <div className="consul-viewOrder-container">
      <Flex justify="center">
        <h1>Fish Order</h1>
      </Flex>

      <Flex justify="space-around">
        <div className="consul-viewOrder-listFish">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<Avatar src={item.koiFish?.images} />}
                  title={
                    <span>{item.koiFish?.breed?.breedName || "Unknown"}</span>
                  }
                  description={
                    item.koiFish?.description || "No description available"
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div className="consul-viewOrder-price">
          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Price Summary
          </span>

          <Flex
            vertical
            style={{ lineHeight: "2", fontSize: "16px", height: "30%" }}
          >
            <span>
              <strong>Total Price:</strong>{" "}
              <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                {Number(order.totalPrice || 0).toLocaleString("en-US")} VND
              </span>
            </span>
            <span>
              <strong>Paid Money:</strong>{" "}
              <span style={{ color: "#52c41a", fontWeight: "bold" }}>
                {Number(order.paidMoney || 0).toLocaleString("en-US")} VND
              </span>
            </span>
            <span>
              <strong>Remaining Money:</strong>{" "}
              <span style={{ color: "#f5222d", fontWeight: "bold" }}>
                {Number(order.totalPrice - order.paidMoney || 0).toLocaleString(
                  "en-US"
                )}{" "}
                VND
              </span>
            </span>

            <span>
              <strong>Delivering date:</strong>{" "}
              <span>
                {order?.deliveringDate === null ||
                order?.deliveringDate === undefined
                  ? "Will be updated after confirmation"
                  : new Date(order.deliveringDate).toISOString().split("T")[0]}
              </span>
            </span>
          </Flex>

          <Flex style={{ height: "30%", width: "100%" }}>
            {order?.status === "CANCEL" ? (
              <span style={{ color: "#f5222d", fontWeight: "bold" }}>
                *Your order was cancelled
              </span>
            ) : order?.status === "CONFIRM" ? (
              <span style={{ color: "#52c41a", fontWeight: "bold" }}>
                *Your order will be delivered soon
              </span>
            ) : order?.status === "DELIVERING" ? (
              <span style={{ color: "#52c41a", fontWeight: "bold" }}>
                *Your order will be delivered soon
              </span>
            ) : (
              <>
                <Popover
                  content={
                    <div>
                      <p>Are you sure you want to confirm this order?</p>
                      <Button
                        type="primary"
                        onClick={handleConfirm}
                        style={{ marginRight: 10 }}
                      >
                        Yes
                      </Button>
                      <Button onClick={() => setConfirmPopoverVisible(false)}>
                        No
                      </Button>
                    </div>
                  }
                  trigger="click"
                  visible={confirmPopoverVisible}
                  onVisibleChange={(visible) =>
                    setConfirmPopoverVisible(visible)
                  }
                >
                  <Button
                    style={{
                      marginRight: 10,
                      backgroundColor: "#52c41a",
                      color: "#fff",
                      border: "none",
                    }}
                    type="primary"
                  >
                    Confirm
                  </Button>
                </Popover>

                <Popover
                  content={
                    <div>
                      <p>Please provide a reason for canceling this order:</p>
                      <Form onFinish={(values) => handleCancel(values.notes)}>
                        <Form.Item
                          name="notes"
                          rules={[
                            {
                              required: true,
                              message: "Please provide a reason!",
                            },
                          ]}
                        >
                          <textarea
                            placeholder="Enter your note"
                            style={{
                              width: "100%",
                              borderRadius: "4px",
                              border: "1px solid #d9d9d9",
                              padding: "5px",
                            }}
                            rows={3}
                          />
                        </Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          danger
                          style={{ marginRight: 10 }}
                        >
                          Submit
                        </Button>
                        <Button onClick={() => setCancelPopoverVisible(false)}>
                          Cancel
                        </Button>
                      </Form>
                    </div>
                  }
                  trigger="click"
                  visible={cancelPopoverVisible}
                  onVisibleChange={(visible) =>
                    setCancelPopoverVisible(visible)
                  }
                >
                  <Button
                    style={{
                      backgroundColor: "#f5222d",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Cancel
                  </Button>
                </Popover>
              </>
            )}
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export default CustomerFishOrder;
