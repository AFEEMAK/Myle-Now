import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import EmailVerify from './pages/EmailVerify';
import Cart from './pages/Cart';
import OrderDetailsCS from './pages/OrderDetailsCS';
import OrderDetailsSP from './pages/OrderDetailsSP';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='*' element={<Nopage />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/services/:id' element={<Services />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route exact path='/serviceDetails/:id' element={<ServiceDetails />} />
        <Route exact path='/Cart' element={<Cart />} />
        <Route exact path='/OrderDetailsCS' element={<OrderDetailsCS/>} />
        <Route exact path='/OrderDetailsSP' element={<OrderDetailsSP/>} />
      </Routes>
    </>
  );
}

export default App;
