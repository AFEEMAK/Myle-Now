import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useOrder = () => {
  const [order, setOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext(); // Get user from context

  const createOrder = async (formData) => {
    setIsLoading(true);
    setError(null);
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      apt,
      city,
      state,
      zip,
      country,
      deliveryDateTime
    } = formData;
    console.log("Fr", email);
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !apt ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !deliveryDateTime
    ) {
      setError("Incomplete Data");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          email,
          firstName,
          lastName,
          phone,
          address,
          apt,
          city,
          state,
          zip,
          country,
          deliveryDateTime,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        window.location.href = json.checkoutUrl;
      } else {
        throw new Error(json.error || "Failed to create order");
      }
      setOrder(json);
      setIsLoading(false);
      return json;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getOrder = async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/order/${orderId}`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      setOrder(json);
      setIsLoading(false);
      return json;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getAllOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/order`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      setOrderList(json);
      setIsLoading(false);
      return json;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return {
    order,
    orderList,
    createOrder,
    getOrder,
    getAllOrders,
    isLoading,
    error,
  };
};
