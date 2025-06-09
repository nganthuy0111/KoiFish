import React, { useState } from "react";
import { Button, Image, Input, Modal, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

function EditOrderModal({ visible, onClose, order, availableFish, onUpdate }) {
  const [editOrder, setEditOrder] = useState(order);
  const [selectedFishId, setSelectedFishId] = useState(null);

  const handleEditChange = (field, value) => {
    setEditOrder((prev) => ({ ...prev, [field]: value }));
  };

  const addFishToOrder = () => {
    if (selectedFishId) {
      const selectedFish = availableFish.find((fish) => fish.id === selectedFishId);
      if (selectedFish) {
        const isFishInCart = editOrder.shoppingCarts.some((cart) => cart.koiFish.id === selectedFishId);
        if (!isFishInCart) {
          const newFishEntry = {
            koiFish: selectedFish,
            deleted: false,
          };
          setEditOrder((prev) => ({
            ...prev,
            shoppingCarts: [...prev.shoppingCarts, newFishEntry],
          }));
          setSelectedFishId(null);
          message.success("Fish added to the order");
        } else {
          message.warning("This fish is already in the order.");
        }
      }
    }
  };

  const removeFishFromOrder = (index) => {
    const updatedShoppingCart = [...editOrder.shoppingCarts];
    updatedShoppingCart.splice(index, 1);
    setEditOrder((prev) => ({ ...prev, shoppingCarts: updatedShoppingCart }));
    message.success("Fish removed from the order");
  };

  const handleSave = async () => {
    const updateData = {
      shoppingCart: editOrder.shoppingCarts.map((cart) => cart.koiFish.id),
      status: editOrder.status,
      paidMoney: editOrder.paidMoney,
      totalPrice: editOrder.totalPrice,
    };
    try {
      await onUpdate(editOrder.id, updateData); // Pass the updated data back to the parent component
      message.success("Order updated successfully");
      onClose();
    } catch (err) {
      console.error("Error updating order:", err);
      message.error("Failed to update order");
    }
  };

  return (
    <Modal
      title="Edit Order"
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
      okText="Save"
      cancelText="Cancel"
    >
      <div>
        <label>Total Price:</label>
        <Input
          type="number"
          value={editOrder?.totalPrice || ""}
          onChange={(e) => handleEditChange("totalPrice", e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Paid Money:</label>
        <Input
          type="number"
          value={editOrder?.paidMoney || ""}
          onChange={(e) => handleEditChange("paidMoney", e.target.value)}
        />
      </div>
      <h4 style={{ marginTop: "20px" }}>Existing fish in order</h4>
      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
        <tbody>
          {editOrder?.shoppingCarts?.map((cart, index) => (
            <tr key={index} className="koi-update">
              <td style={{ padding: "10px", textAlign: "center" }} width={70} height={105}>
                <Image src={cart.koiFish?.images} alt="Fish Image" className="image" />
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>{cart.koiFish?.breed?.breedName}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>{cart.koiFish?.farm?.farmName}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button onClick={() => removeFishFromOrder(index)}>
                  <DeleteOutlined />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 style={{ marginTop: "20px" }}>Add New Fish to Order</h4>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select
          value={selectedFishId}
          onChange={(value) => setSelectedFishId(value)}
          style={{ width: "100%" }}
          placeholder="Select fish to add"
        >
          {availableFish.map((fish) => (
            <Option key={fish.id} value={fish.id}>
              {fish.breed?.breedName} - {fish.farm?.farmName}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={addFishToOrder}>
          Add Fish
        </Button>
      </div>
    </Modal>
  );
}

export default EditOrderModal;
