import React, { useEffect, useState } from "react";
import "../components/CheckoutPage.css";
import "../components/CartItems.css";
import { useOrder } from "../hooks/useOrder";
import { useCart } from "../hooks/useCart";
import Loader from "../components/Global/Loader";

const CheckoutPage = () => {
  const [fetchedCart, setFetchedCart] = useState([]);
  const {
    isLoading,
    fetchCart,
    removeFromCart,
    updateCartItemQuantity,
    error,
  } = useCart();
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
  });

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
    await createOrder(formData);
    console.log("Form submitted!", formData);
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
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="apt"
              name="apt"
              placeholder="Apt / Suite"
              value={formData.apt}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <p>By clicking "Checkout," I agree to the terms and conditions.</p>

          {error || (orderError && <p className="">{error || orderError}</p>)}

          <button
            className="btnn"
            disabled={isLoading || orderLoading}
            type="submit"
          >
            {orderLoading ? (
              <span>proceeding to payment page...</span>
            ) : (
              <span>checkout</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
