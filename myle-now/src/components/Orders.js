import './Orders.css';
import massage from '../assets/massage.png';

import { useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { useAuthContext } from "../hooks/useAuthContext";
function Orders(){
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

    

    return(
        <div>
        <h1 className="orderHeading">Order History</h1>
        {isLoading ? (
            <p>Loading...</p>
        ) : error ? (
            <p className="errorText">{error}</p>
        ) : (
            
            <div className="ordersContainer">
            {orderList.length === 0 ? (
                <p>No orders found</p>
              ) : (
                orderList.map((order) => (

            <div className="orderCard"  key={order._id}>
                
                <div className="orderImg">
                    <img src={massage} alt=""></img>

                </div>
                <div className="orderInfo">
                    <div className="div1">
                        <div className="orderNameNumber">
                            <h3 className="orderName">{order?.serviceId?.name}</h3>
                            <p className="para">Order Number: {order._id}</p>
                        </div>
                        <div className="buttons">
                        {order.paymentStatus === "failed" && (
                  <button
                    className="retryButton"
                    onClick={() => handleRetryPayment(order._id)}
                  >
                    Retry Payment
                  </button>
                )}
                        </div>
                    </div>
                    <div className="div2">
                    {order.serviceProvider === "" ? (
                 <p className="para">Service Provider : <b>A service provider will be assigned soon </b></p>
                  
                ) : (
                  <p className="para">Service Provider :{order.serviceProvider}</p>
                )}
                        
                        <p className="para">{order.phone}</p>
                    </div>
                    <hr class="orderLine"></hr>
                    <div className="div3">
                        <p className="para">Address: {order.address}</p>
                        <p className="status">SCHEDULED</p>
                    </div>
                    <div className="div4">
                        <p className="orderTotal">Order Total: {order.totalAmount} CAD</p>
                        <p className="time">{new Date(order.deliveryDateTime).toLocaleString()}</p>
                    </div>

                </div>

            </div>
             ))
              
            )}
        </div>
        )}
       
        </div>
    )

}

export default Orders;