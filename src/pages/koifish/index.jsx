import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Badge, Button, Card, Col, Row, Modal} from "antd";
import Meta from "antd/es/card/Meta";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import "./koi.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../redux/features/cartSlice";
import { useLocation } from "react-router-dom";

function KoiFish() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const bookingId = queryParams.get("id");

  const [datas, setDatas] = useState([]);
  const currentUser = useSelector((state) => state.user.id);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false); // State for cart modal visibility

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart[currentUser] || []);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const fetchFish = async (page, pageSize) => {
    try {
      console.log(`Fetching fish for bookingId: ${bookingId}`);
      const response = await api.get(
        `koi/listKoiFish?page=${page - 1}&size=${pageSize}&id=${bookingId}`
      );
      const { totalElements, listData } = response.data.listData;
      const filteredData = (listData || response.data.listData).filter(
        (item) => !item.deleted
      );
      setDatas(filteredData);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchFish(pagination.current, pagination.pageSize);
  }, [bookingId]);

  const handleAddToCart = (product) => {
    if (currentUser) {
      const cartItemIds = cartItems.map((item) => item.id);
      if (cartItemIds.includes(product.id)) {
        toast.warn("This item is already in your cart!");
      } else {
        dispatch(addProduct({ userId: currentUser, product }));
        toast.success("Added to cart successfully!");
      }
    } else {
      toast.error("Please log in to add items to your cart.");
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct({ userId: currentUser, productId }));
    toast.info("Item removed from cart.");
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        shoppingCart: cartItems.map((item) => item.id),
        customerId: currentUser,
        status: "PENDING",
        paidMoney: 0,
        totalPrice: 0,
        bookingId:bookingId
      };

      await api.post("order", orderData);
      toast.success("Order submitted successfully!");
      setIsCartModalVisible(false); // Close the modal on successful submission
    } catch (error) {
      toast.error("Failed to submit order: " + error.message);
    }
  };

  const handleCartClick = () => {
    setIsCartModalVisible(true); // Show the cart modal
  };

  const handleCloseCartModal = () => {
    setIsCartModalVisible(false); // Close the cart modal
  };

  return (
    <div className="body">
      <div className="tour__body">
        <div className="countcart">
          <Badge count={cartItems.length} showZero>
            <ShoppingCartOutlined
              style={{ fontSize: 24 }}
              onClick={handleCartClick} // Open the modal on click
            />
          </Badge>
        </div>
        <div className="cardrow">
          <Row gutter={16}>
            {datas.map((item) => (
              <Col span={6} key={item.id} className="cardtour">
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="Koi" src={item.images} />}
                >
                  <div className="titlecart">
                    <Meta title={item.breed?.breedName} />
                    <Button
                      className="btncart"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCartOutlined />
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Cart Modal */}
      <Modal
        title="Koi Cart"
        visible={isCartModalVisible}
        onCancel={handleCloseCartModal}
        footer={null}
        width={800}
      >
        <table className="koi-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Breed</th>
              <th>Farm</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.images} alt={item.breedName} width="100" />
                  </td>
                  <td>{item.breed?.breedName}</td>
                  <td>{item.farm?.farmName}</td>
                  <td>{item.description}</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleDeleteProduct(item.id)}
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Cart empty...</td>
              </tr>
            )}
          </tbody>
        </table>
        {cartItems.length > 0 && (
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" onClick={handleSubmitOrder}>
              Submit Order
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default KoiFish;
