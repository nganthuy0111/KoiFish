import React, { useEffect, useState } from "react";
import "./FishOrderForBooking.scss";
import {
  Avatar,
  Button,
  Flex,
  List,
  Popover,
  DatePicker,
  Form,
  Modal,
  Collapse,
  InputNumber,
} from "antd";
import { CiEdit } from "react-icons/ci";
import api from "../../../../config/axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

function FishOrderForBooking() {
  const [order, setOrder] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isFishPickerOpen, setIsFishPickerOpen] = useState(false);
  const [isPriceUpdateOpen, setIsPriceUpdateOpen] = useState(false);
  const [farmFish, setFarmFish] = useState([]);
  const [selectedFishIds, setSelectedFishIds] = useState([]);

  const location = useLocation();
  const { openTourId } = location.state || {};

  const fetchOrder = async () => {
    try {
      const response = await api.get(`order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      setOrder(null);
      toast.error("Error fetching order");
    }
  };

  const fetchFarmFish = async () => {
    try {
      const response = await api.get(
        `koi/list-koi/booking-id?bookingId=${order.booking.bookingId}`
      );
      setFarmFish(response.data);
    } catch (error) {
      toast.error("Error fetching fish list");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order && order.booking) {
      fetchFarmFish();
    }
  }, [order]);

  const handleDelivering = async (values) => {
    try {
      const response = await api.put(
        `order/delivering/${order.id}`,
        `"${values.date.format("YYYY-MM-DD")}"`,
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      toast.success("Delivering date updated successfully");
      setPopoverVisible(false);
      fetchOrder();
    } catch (error) {
      toast.error("Error updating delivering date");
    }
  };

  const data = order?.shoppingCarts || [];

  if (!order) {
    return <div>Loading...</div>;
  }

  const handleItemClick = (fishId) => {
    setSelectedFishIds((prevSelected) =>
      prevSelected.includes(fishId)
        ? prevSelected.filter((id) => id !== fishId)
        : [...prevSelected, fishId]
    );
  };

  const items = farmFish.map((item, index) => {
    return {
      key: index + 1,
      label: item.farmName,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={item.koiFishList}
          renderItem={(fish) => (
            <List.Item
              key={fish.id}
              onClick={() => handleItemClick(fish.id)}
              style={{
                cursor: "pointer",
                backgroundColor: selectedFishIds.includes(fish.id)
                  ? "#f0f8ff"
                  : "transparent",
                border: selectedFishIds.includes(fish.id)
                  ? "1px solid #1890ff"
                  : "none",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={fish.images} />}
                title={<span>{fish.breed.breedName}</span>}
                description={fish.description}
              />
            </List.Item>
          )}
        />
      ),
    };
  });

  const handleUpdateFishList = async () => {
    const newOrder = {
      shoppingCart: selectedFishIds,
      paidMoney: order.paidMoney,
      totalPrice: order.totalPrice,
    };
    try {
      const response = await api.put(`order/${order.id}`, newOrder);
      setSelectedFishIds([]);
      toast.success("Fish list updated successfully");
      fetchOrder();
    } catch (error) {
      toast.error("Error updating fish list");
    } finally {
      setIsFishPickerOpen(false);
    }
  };
  const handleCancelUpdateFishList = () => {
    setIsFishPickerOpen(false);
  };

  const handleUpdatePrice = async (values) => {
    const oldShoppingCart = order.shoppingCarts.map((item) => item.koiFish.id);
    const newOrder = {
      shoppingCart: oldShoppingCart,
      paidMoney: values.paidMoney,
      totalPrice: values.totalPrice,
    };

    try {
      const response = await api.put(`order/${order.id}`, newOrder);
      toast.success("Price updated successfully");
      fetchOrder();
    } catch (error) {
      toast.error("Error updating price");
    } finally {
      setIsPriceUpdateOpen(false);
    }
  };

  const handleCancelUpdatePrice = () => {
    setIsPriceUpdateOpen(false);
  };

  return (
    <div className="consul-viewOrder-container">
      {/* Back to Tours Button */}
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
          onClick={() => navigate(`/consulting-view-booking/${openTourId}`)}
        >
          <Flex align="center">
            <IoIosArrowBack /> Back to View bookings
          </Flex>
        </span>
        <h1>Fish Order</h1>
      </Flex>

      <Flex justify="space-around">
        <div className="consul-viewOrder-listFish">
          <div className="update-order-button">
            {order?.status !== "CANCEL" &&
              order?.status !== "CONFIRM" &&
              order?.status !== "DELIVERING" && (
                <span onClick={() => setIsFishPickerOpen(true)}>
                  <CiEdit />
                </span>
              )}
          </div>

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

          <div className="update-order-button">
            {order?.status !== "CANCEL" &&
              order?.status !== "CONFIRM" &&
              order?.status !== "DELIVERING" && (
                <span onClick={() => setIsPriceUpdateOpen(true)}>
                  <CiEdit />
                </span>
              )}
          </div>

          <Flex
            vertical
            style={{
              lineHeight: "2",
              fontSize: "16px",
              height: "30%",
              padding: "10px 0",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <span>
              <strong>Total Price:</strong>{" "}
              <span
                style={{
                  color: "#1890ff",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {Number(order.totalPrice || 0).toLocaleString("en-US")} VND
              </span>
            </span>
            <span>
              <strong>Paid Money:</strong>{" "}
              <span
                style={{
                  color: "#52c41a",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {Number(order.paidMoney || 0).toLocaleString("en-US")} VND
              </span>
            </span>
            <span>
              <strong>Remaining Money:</strong>{" "}
              <span
                style={{
                  color: "#f5222d",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {Number(order.totalPrice - order.paidMoney || 0).toLocaleString(
                  "en-US"
                )}{" "}
                VND
              </span>
            </span>

            <span>
              <strong>Delivering date:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: order?.deliveringDate ? "#555" : "#f5222d",
                  fontStyle: order?.deliveringDate ? "normal" : "italic",
                }}
              >
                {order?.deliveringDate
                  ? new Date(order.deliveringDate).toISOString().split("T")[0]
                  : "Not updated yet"}
              </span>
            </span>

            <div
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ color: "#333", fontSize: "16px" }}>Note:</strong>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: order?.notes ? "#555" : "#8c8c8c",
                  fontSize: "15px",
                }}
              >
                {order?.notes ? JSON.parse(order.notes) : "No notes available"}
              </span>
            </div>
          </Flex>

          <Flex style={{ height: "30%", width: "100%" }}>
            {order?.status === "CANCEL" ? (
              <span
                style={{
                  color: "#f5222d",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: "16px",
                }}
              >
                *Order was cancelled by the customer
              </span>
            ) : order?.status === "CONFIRM" ||
              order?.status === "DELIVERING" ? (
              <Popover
                content={
                  <Form onFinish={handleDelivering}>
                    <Form.Item
                      name="date"
                      rules={[
                        { required: true, message: "Please select a date!" },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select Delivering Date"
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: 10 }}
                    >
                      Submit
                    </Button>
                    <Button onClick={() => setPopoverVisible(false)}>
                      Cancel
                    </Button>
                  </Form>
                }
                title="Set Delivering Date"
                trigger="click"
                visible={popoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
              >
                <Button style={{ marginRight: 10 }} type="primary">
                  Set Delivering
                </Button>

                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    fontSize: "16px",
                  }}
                >
                  *Customer confirmed this order
                </span>
              </Popover>
            ) : (
              <Button
                style={{
                  marginRight: 10,
                  backgroundColor: "#d9d9d9",
                  color: "#8c8c8c",
                  border: "none",
                  cursor: "not-allowed",
                }}
                disabled
              >
                Set Delivering (Customer not confirmed yet)
              </Button>
            )}
          </Flex>
        </div>
      </Flex>

      {/* Modal update */}
      <Modal
        title="Update fish list"
        open={isFishPickerOpen}
        onOk={handleUpdateFishList}
        onCancel={handleCancelUpdateFishList}
      >
        <div className="koi-fish-picker">
          <Collapse items={items} defaultActiveKey={["1"]} />
        </div>
      </Modal>

      <Modal
        title="Update Price"
        open={isPriceUpdateOpen}
        onOk={handleUpdatePrice}
        onCancel={handleCancelUpdatePrice}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleUpdatePrice}
          initialValues={{
            totalPrice: order?.totalPrice || 0,
            paidMoney: order?.paidMoney || 0,
          }}
        >
          {/* Total Price Input */}
          <Form.Item
            label="New Total Price"
            name="totalPrice"
            rules={[
              { required: true, message: "Please input the total price!" },
              {
                type: "number",
                min: 0,
                message: "Total price must be a positive number!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter new total price"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Paid Money Input */}
          <Form.Item
            label="New Paid Money"
            name="paidMoney"
            rules={[
              { required: true, message: "Please input the paid money!" },
              {
                type: "number",
                min: 0,
                message: "Paid money must be a positive number!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const totalPrice = getFieldValue("totalPrice");
                  if (value === undefined || totalPrice === undefined) {
                    return Promise.resolve();
                  }
                  if (totalPrice > value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Paid money must be less than the total price!")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              placeholder="Enter new paid money"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Submit and Cancel Buttons */}
          <Form.Item>
            <Flex justify="end" style={{ gap: "10px" }}>
              <Button onClick={handleCancelUpdatePrice}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FishOrderForBooking;
