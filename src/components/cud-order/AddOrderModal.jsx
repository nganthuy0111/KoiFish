import React, { useState } from "react";
import { Modal, Input, Select, Button, message } from "antd";
import api from "../../config/axios";

const { Option } = Select;

function AddOrderModal({ visible, onClose, onAddOrder, availableFish = [], customerId, bookingId }) { // Default to an empty array
  const [newOrder, setNewOrder] = useState({
    totalPrice: 0,
    paidMoney: 0,
    shoppingCart: [],
    customerId: customerId, // Include customerId in the new order
    bookingId: bookingId,   // Include bookingId in the new order
  });
  const [selectedFishId, setSelectedFishId] = useState(null);

  const handleNewOrderChange = (field, value) => {
    setNewOrder((prev) => ({ ...prev, [field]: value }));
  };

  const addFishToNewOrder = () => {
    if (selectedFishId && !newOrder.shoppingCart.includes(selectedFishId)) {
      setNewOrder((prev) => ({
        ...prev,
        shoppingCart: [...prev.shoppingCart, selectedFishId],
      }));
      setSelectedFishId(null);
      message.success("Fish added to the new order");
    } else {
      message.warning("This fish is already in the order or not selected.");
    }
  };

  const handleAddOrder = async () => {
    const orderData = {
      ...newOrder,
      customerId,
      bookingId,
    };

    try {
      await api.post("order", orderData);
      message.success("Order added successfully");
      onAddOrder(); 
    } catch (err) {
      console.error("Error adding order:", err);
      message.error(err.response?.data?.message || "Failed to add order");
    } 
  };

  return (
    <Modal
      title="Add New Order"
      visible={visible}
      onCancel={onClose}
      onOk={handleAddOrder}
      okText="Add"
      cancelText="Cancel"
    >
      <div style={{ marginTop: "10px" }}>
        <label>Total Price:</label>
        <Input
          type="number"
          value={newOrder.totalPrice}
          onChange={(e) => handleNewOrderChange("totalPrice", e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Paid Money:</label>
        <Input
          type="number"
          value={newOrder.paidMoney}
          onChange={(e) => handleNewOrderChange("paidMoney", e.target.value)}
        />
      </div>

      <h4 style={{ marginTop: "20px" }}>Add Fish to Order</h4>
      <Select
        value={selectedFishId}
        onChange={(value) => setSelectedFishId(value)}
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="Select fish to add"
      >
        {(availableFish || []).map((fish) => ( // Use (availableFish || []) to ensure it's an array
          <Option key={fish.id} value={fish.id}>
            {fish.breed?.breedName} - {fish.farm?.farmName}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={addFishToNewOrder}>
        Add Fish
      </Button>
    </Modal>
  );
}

export default AddOrderModal;
