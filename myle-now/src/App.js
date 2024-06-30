import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';


function App() {
  const {user} = useAuthContext()

  return (
    <>
   
    <Routes>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/Login' element={!user ? <Login /> : <Navigate to='/'/> }/>
      <Route path='*' element={<Nopage/>}/>
      <Route path='/Register' element={!user ? <Register /> : <Navigate to='/'/>}/>
      <Route path={`/Services/:id`} element={<Services/>}/>
      <Route exact path={`ServiceDetails/:id`} element={<ServiceDetails/>}/>
    </Routes>
  
      
    </>
  );
}

export default App;
