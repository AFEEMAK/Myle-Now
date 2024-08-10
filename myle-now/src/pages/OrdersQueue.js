import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpNav from "../components/SpNav";
import '../components/Orders.css';
import massage from '../assets/massage.png';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/order/orders-queue');
                setOrders(response.data);
            } catch (error) {
                setError('Failed to fetch orders.');
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleConfirm = async (orderId) => {
        const isConfirmed = window.confirm('Are you sure you want to confirm this order?');
        if (isConfirmed) {
            try {
                await axios.put(`/api/order/order/${orderId}`);
                // Refresh the order list after confirming
                window.location.reload();
            } catch (error) {
                console.error('Error confirming order:', error);
            }
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ordersContainer">
            <h1 className="orderHeading">Order Queue</h1>
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
                                    <button 
                                        className="editBtn" 
                                        onClick={() => handleConfirm(order._id)}
                                    >
                                        Confirm
                                    </button>
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

const OrdersQueue = () => (
    <>
        <SpNav />
        <OrderList />
    </>
);

export default OrdersQueue;
