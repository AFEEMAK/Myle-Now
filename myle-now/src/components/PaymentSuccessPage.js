import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./paymentSuccessPage.css"; 
import Loader from "./Global/Loader";

export default function PaymentSuccessPage() {
  const [paymentStatus, setPaymentStatus] = useState("checking");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    console.log("sessionId", sessionId);
    if (sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setPaymentStatus("error");
    }
  }, [location]);

  const checkPaymentStatus = async (sessionId) => {
    try {
      const response = await fetch(
        `/api/order/check-payment-status?session_id=${sessionId}`
      );
      const data = await response.json();
      console.log("Data", data);
      setPaymentStatus(data.status);

      if (data.status === "success") {
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } else if (data.status === "failed") {
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setPaymentStatus("error");
    }
  };
  if (paymentStatus === "checking") {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 h-screen">
      {paymentStatus !== "checking" && paymentStatus === "success" ? (
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p>Have a great day!</p>
            <div className="py-10 text-center">
              <Link
                to="/orders"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO To Orders
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm5.91,7.89a1,1,0,0,0-1.42,0L12,12.38,7.51,7.89a1,1,0,0,0-1.42,1.42L10.58,13.8,6.09,18.29a1,1,0,1,0,1.42,1.42L12,15.22l4.49,4.49a1,1,0,0,0,1.42-1.42L13.42,13.8l4.49-4.49A1,1,0,0,0,17.91,7.89Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">
              Your payment was not successful. Please try again or contact
              support.
            </p>
            <p>Redirecting to orders...</p>
          </div>
        </div>
      )}
    </div>
  );
}
