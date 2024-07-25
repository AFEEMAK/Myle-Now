import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext(); // Get user from context

  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart`);
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setCart(json.items);
        return json.items;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (serviceId, quantity = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, serviceId, quantity }),
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setCart(json);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (serviceId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, serviceId }),
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setCart(json);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItemQuantity = async (serviceId, quantity) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, serviceId, quantity }),
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setCart(json);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    isLoading,
    error,
  };
};
