import React, { useEffect, useState } from "react";
import "../components/CheckoutPage.css";
import "../components/CartItems.css";
import { useOrder } from "../hooks/useOrder";
import { useCart } from "../hooks/useCart";
import Loader from "../components/Global/Loader";

const CheckoutPage = () => {
  const [fetchedCart, setFetchedCart] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    country: "Canada",
    deliveryDateTime: ""  // Added field for date-time
  });

  const {
    isLoading,
    fetchCart,
    removeFromCart,
    updateCartItemQuantity,
    error,
  } = useCart();
  const {
    createOrder,
    isLoading: orderLoading,
    error: orderError,
  } = useOrder();

  const getCart = async () => {
    try {
      const data = await fetchCart();
      if (data) {
        setFetchedCart(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleRemoveFromCart = async (serviceId) => {
    await removeFromCart(serviceId);
    setFetchedCart((prevCart) =>
      prevCart.filter((item) => item.serviceId && item.serviceId._id !== serviceId)
    );
  };

  const handleUpdateCartItemQuantity = async (serviceId, quantity) => {
    await updateCartItemQuantity(serviceId, quantity);
    setFetchedCart((prevCart) =>
      prevCart.map((item) =>
        item.serviceId && item.serviceId._id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validate that the delivery date is in the future
    const selectedDate = new Date(formData.deliveryDateTime);
    if (selectedDate <= new Date()) {
      alert("Please select a future date.");
      return;
    }

    try {
      await createOrder(formData);
      alert("Order placed successfully!");
      // Redirect to a success page or clear the cart
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  if (isLoading || orderLoading) {
    return <Loader />;
  }

  return (
    <div className="checkout-page">
      <section className="cartSummary">
        <h2>SUMMARY</h2>
        {fetchedCart?.map((item, index) =>
          item.serviceId ? (
            <div className="subtotal" key={index}>
              <p className="p1">{item.serviceId.name || 'No Name'}</p>
              <p className="p1">{item.quantity}</p>
              <p className="p2">{item.serviceId.price || 'No Price'} CAD</p>
          
            </div>
          ) : null
        )}
        <div className="subtotal">
          <p className="p1">Shipping and Handling</p>
          <p className="p2">5 CAD</p>
        </div>
        <div className="subtotal">
          <p className="p1">Tax (Calculated At Checkout)</p>
          <p className="p2">---</p>
        </div>
        <hr />
        <div className="subtotal">
          <p className="bold">Total</p>
          <p className="bold">
            {fetchedCart.reduce(
              (total, item) =>
                item.serviceId ? total + item.serviceId.price * item.quantity : total,
              5
            )}{" "}
            CAD
          </p>
        </div>
      </section>
      <div className="checkout-form">
        <h2>Customer Information</h2>
        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apt">Apt/Suite:</label>
            <input
              type="text"
              id="apt"
              name="apt"
              value={formData.apt}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryDateTime">Preferred Delivery Date & Time:</label>
            <input
              type="datetime-local"
              id="deliveryDateTime"
              name="deliveryDateTime"
              value={formData.deliveryDateTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <p>By clicking "Checkout," I agree to the terms and conditions.</p>

          {error || (orderError && <p className="error">{error || orderError}</p>)}

          <button
            className="btnn"
            disabled={isLoading || orderLoading}
            type="submit"
          >
            {orderLoading ? (
              <span>Proceeding to payment page...</span>
            ) : (
              <span>Checkout</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
