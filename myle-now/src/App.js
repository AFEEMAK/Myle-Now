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
import AddService from './pages/AddService';

function App() {
  const { user } = useAuthContext();
  let role = null
  if(user){

     role  = user.role
    console.log(role)
  }

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='*' element={<Nopage />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
    
        <Route path='/admin/add/service' element={role === 'admin' ? <AddService /> : <Navigate to='/'/> } />
        <Route path='/services/:id' element={<Services />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route exact path='/serviceDetails/:id' element={<ServiceDetails />} />
      </Routes>
    </>
  );
}

export default App;
