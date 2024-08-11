import trash from "../assets/trash.png";
import massage from "../assets/massage.png";
import "./CartItems.css";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartItems() {
  const [fetchedCart, setFetchedCart] = useState([]);
  const {
    isLoading,
    fetchCart,
    removeFromCart,
    updateCartItemQuantity,
    error,
  } = useCart();

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

  return (
    <div className="cartContainer">
      <h1 className="cartHeading">Your Cart</h1>
      <div className="cartItemsList">
        <section className="try">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            fetchedCart.map((item, index) => (
              item?.serviceId && ( 
              
                <div className="cartItems" key={index}>
                  <div className="imgSec">
                    <img src={require(`../assets/${item?.serviceId.image}`)} alt="" />
                  </div>

                  <div className="infoSec">
                    <div className="info1">
                      <div className="info1Text">
                        <h3 className="cardItemName">{item?.serviceId.name}</h3>
                        <p>{item?.serviceId.description}</p>
                      </div>
                      <div
                        onClick={() => handleRemoveFromCart(item.serviceId._id)}
                        className="info1Img"
                      >
                        <img src={trash} alt="" />
                      </div>
                    </div>

                    <hr />

                    <div className="info2">
                      <div className="quantity">
                        <button
                          onClick={() =>
                            handleUpdateCartItemQuantity(
                              item.serviceId._id,
                              item.quantity - 1
                            )
                          }
                          disabled={isLoading || item.quantity <= 1}
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          disabled={isLoading}
                          onClick={() =>
                            handleUpdateCartItemQuantity(
                              item.serviceId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="price">
                        <p className="priceText">{item?.serviceId.price} CAD</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))
          )}
        </section>

        <section className="cartSummary">
          <h2>SUMMARY</h2>

          {fetchedCart?.map((item, index) => (
            item?.serviceId && ( 
              <div className="subtotal" key={index}>
                <p className="p1">{item?.quantity} - {item?.serviceId.name}</p>
                <p className="p2">{item?.serviceId.price * item?.quantity} CAD</p>
              </div>
            )
          ))}
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
                  item?.serviceId ? total + item?.serviceId.price * item.quantity : total,
                5
              )}{" "}
              CAD
            </p>
          </div>
          <Link to={"/checkout"}>
            <button
              style={{ width: "100%" }}
              disabled={isLoading}
              className="checkoutBtn"
            >
              checkout
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default CartItems;
