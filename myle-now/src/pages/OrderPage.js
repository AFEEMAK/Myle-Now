import { useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { useAuthContext } from "../hooks/useAuthContext";
import "./OrderPage.css";

const OrderPage = () => {
  const { user } = useAuthContext();
  const { orderList, getAllOrders, isLoading, error } = useOrder();
  const [retryOrderId, setRetryOrderId] = useState(null);

  useEffect(() => {
    if (user) {
      getAllOrders();
      console.log("OrderList", orderList);
    }
  }, [user]);

  const handleRetryPayment = async (orderId) => {
    try {
      const response = await fetch("/api/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const json = await response.json();

      if (response.ok) {
        window.location.href = json.checkoutUrl;
      } else {
        throw new Error(json.error || "Failed to retry payment");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="orderPageContainer">
      <h1 className="pageHeading">Your Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="errorText">{error}</p>
      ) : (
        <div className="orderList">
          {orderList.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orderList.map((order) => (
              <div className="orderItem" key={order._id}>
                <div className="orderDetails">
                  <h3>Order #{order._id}</h3>
                  <p>{order?.serviceId?.name}</p>
                  <p>Total Amount: ${order.totalAmount}</p>
                  <p>Status: {order.paymentStatus}</p>
                </div>
                {order.paymentStatus === "failed" && (
                  <button
                    className="retryButton"
                    onClick={() => handleRetryPayment(order._id)}
                  >
                    Retry Payment
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
