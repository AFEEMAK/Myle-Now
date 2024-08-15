import SpNav from "../components/SpNav";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = ({ orders }) => {
    return (
        <div className="ordersContainer">
            <h1 className="orderHeading">Your Confirmed Order</h1>
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                orders.map(order => (
                    <div className="orderCard" key={order._id}>
                        <div className="orderImg">
                            <img src={require(`../assets/${order?.serviceId.image}`)} alt="Order" />
                        </div>
                        <div className="orderInfo">
                            <div className="div1">
                                <div className="orderNameNumber">
                                    <h3 className="orderName">{order.serviceId.name}</h3>
                                    <p className="para">Order Number: {order._id}</p>
                                </div>
                                <div className="buttons">
                                   
                                </div>
                            </div>
                            <div className="div2">
                                <p className="para">Contact: {order.phone}</p>
                            </div>
                            <hr className="orderLine" />
                            <div className="div3">
                                <p className="para">Address: {order.address}</p>
                                <p className="status">{order.paymentStatus}</p>
                            </div>
                            <div className="div4">
                                <p className="orderTotal">Order Total: {order.totalAmount} CAD</p>
                                <p className="time">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};



function ServiceProvider() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order/orders-with-service-provider'); 
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <SpNav />
            <OrderList orders={orders} />
        </>
    );
}

export default ServiceProvider;