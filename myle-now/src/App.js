import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import CheckoutPage from './pages/Checkout';
import EmailVerify from './pages/EmailVerify';
import AddService from './pages/AddService';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderDetailsSP from './pages/OrderDetailsSP';
import OrderDetailsCS from './pages/OrderDetailsCS';
import CreateAccount from './pages/CreateAccount'; 

function App() {
  const { user } = useAuthContext();
  let role = null;
  if (user) {
    role = user.role;
    console.log(role);
  }

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='*' element={<Nopage />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/services/:id' element={<Services />} />
        <Route path='/serviceDetails/:id' element={<ServiceDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin/add/service' element={role === 'admin' ? <AddService /> : <Navigate to='/' />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/ordersCS' element={<OrderDetailsCS />} />
        <Route path='/ordersSP' element={<OrderDetailsSP />} />
        <Route path='/create-account' element={<CreateAccount />} /> {}
      </Routes>
    </>
  );
}

export default App;
