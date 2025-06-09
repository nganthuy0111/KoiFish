import "./koicart.css";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../redux/features/cartSlice";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function KoiCart() {
  const customerId = useSelector((state) => state.user.id); 
  console.log(customerId)
  const cartItems = useSelector((state) => state.cart[customerId] || []); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleDeleteProduct = (id) => {
    dispatch(removeProduct({ userId: customerId, productId: id })); 
  };

  const handleSubmitOrder = async () => {
    
    try {
      const orderData = {
        shoppingCart: cartItems.map(item => item.id),
        customerId: customerId,
        status: "PENDING",
        paidMoney: 0,
        totalPrice: 0,
      };

      const response = await api.post("order", orderData); 
      toast.success("Order submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit order: " + error.message);
    }
  };

  const handleBack = () => {
    navigate('/koi'); 
  };

  return (
    <div className="body">
      <div className="back">
        <ArrowLeftOutlined onClick={handleBack} className="backbtn"/>
      </div>
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
            cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.image} alt={item.breedName} width="100" />
                </td>
                <td>{item.breed?.breedName}</td>
                <td>{item.farm?.farmName}</td>
                <td>{item.description}</td>
                <td>
                  <DeleteOutlined onClick={() => handleDeleteProduct(item.id)} />
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
        <div>
          <button onClick={handleSubmitOrder} className="submit-order-button">
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
}

export default KoiCart;