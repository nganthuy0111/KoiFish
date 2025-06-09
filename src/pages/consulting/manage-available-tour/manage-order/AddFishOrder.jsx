import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./AddFishOrder.scss";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Flex,
  Form,
  Image,
  InputNumber,
  List,
  Modal,
} from "antd";
import Panel from "antd/es/splitter/Panel";
import { red } from "@mui/material/colors";

function AddFishOrder() {
  const { bookingId } = useParams();
  const location = useLocation();
  const { customerId, openTourId } = location.state || {};
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const [farmFish, setFarmFish] = useState([]);
  const [redirected, setRedirected] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`order/booking/${bookingId}`);
      setOrder(response.data);
    } catch (error) {
      setOrder(null);
    }
  };

  const fetchFarmFish = async () => {
    try {
      const response = await api.get(
        `koi/list-koi/booking-id?bookingId=${bookingId}`
      );
      setFarmFish(response.data);
    } catch (error) {
      toast.error("Error fetching fish list");
    }
  };

  useEffect(() => {
    const checkOrderOnLoad = async () => {
      await fetchOrder();
    };

    checkOrderOnLoad();
    fetchFarmFish();
  }, [bookingId]);

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      navigate(`/consulting-view-order/${order.koiFishOrderId}`, {
        state: { openTourId: openTourId },
      });
    }
  }, [order]);

  const [selectedFishIds, setSelectedFishIds] = useState([]);

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

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const orderInfo = {
      shoppingCart: selectedFishIds,
      customerId: customerId,
      bookingId: bookingId,
      paidMoney: values.paidMoney,
      totalPrice: values.totalPrice,
    };

    try {
      const reponse = await api.post("order", orderInfo);
      toast.success("Order created successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Error creating order");
    }
  };

  return (
    <div className="add-order-container">
      <div>
        <h1>Create Koi Fish Order</h1>
      </div>

      <Flex justify="space-between">
        <div className="koi-fish-picker">
          <Collapse items={items} defaultActiveKey={["1"]} />
        </div>
        <div className="price-calculator">
          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Price Summary
          </span>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: 20, width: "100%" }}
          >
            {/* Total Price Input */}
            <Form.Item
              label="Total Price"
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
                placeholder="Enter total price"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Paid Money Input */}
            <Form.Item
              label="Paid Money"
              name="paidMoney"
              rules={[
                { required: true, message: "Please input the paid money!" },
                {
                  type: "number",
                  min: 0,
                  message: "Paid money must be a positive number!",
                },
                {
                  validator: (_, value) => {
                    const totalPrice = form.getFieldValue("totalPrice");
                    if (value && totalPrice && value > totalPrice) {
                      return Promise.reject(
                        new Error("Paid money cannot exceed the total price!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Enter paid money"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Order
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>

      <div>
        <p>
          <strong>*Note:</strong> Choose fishes from each farm to create order
          for customer.
        </p>
      </div>
    </div>
  );
}

export default AddFishOrder;
//