import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nopage from "./pages/NoPage";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Checkout from "./pages/Checkout";
import CreateAccount from "./pages/CreateAccount";
import EmailVerify from "./pages/EmailVerify";
import AddService from "./pages/AddService";
import AddServiceProvider from "./pages/AddServiceProvider";
import Cart from "./pages/Cart";
import OrderDetailsCS from "./pages/OrderDetailsCS";
import OrderDetailsSP from "./pages/OrderDetailsSP";
import AboutUs from "./components/AboutUs";
import DetailForm from "./pages/DetailForm";
import OrderPage from "./pages/OrderPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import SearchResults from "./pages/SearchResults";

function App() {
  const { user } = useAuthContext();
  let role = null;
  if (user?._id) {
    role = user.role;
    console.log(role);
  }

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={!user?._id ? <Login /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Nopage />} />
        <Route
          path="/register"
          element={!user?._id ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/services/:id" element={<Services />} />
        <Route path="/serviceDetails/:id" element={<ServiceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/add/service" element={<AddService />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        {/* http://localhost:3000/payment-success/cs_test_b1Urvsc8ELt8v2kWNXiExLXHvaYnKIlkPuBt3MxhBjPYX73UznEipp4T97http://localhost:3000/payment-success/cs_test_b1Urvsc8ELt8v2kWNXiExLXHvaYnKIlkPuBt3MxhBjPYX73UznEipp4T97 */}
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/admin/add/service-provider" element={<AddServiceProvider />} />
        <Route path="/ordersCS" element={<OrderDetailsCS />} />
        <Route path="/ordersSP" element={<OrderDetailsSP />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin/add/content" element={<DetailForm />} />
        <Route path="/searchResults" element={<SearchResults />} />

      </Routes>
    </>
  );
}

export default App;
