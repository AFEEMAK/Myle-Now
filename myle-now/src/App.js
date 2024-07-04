import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';

function App() {
  return (
    <>
   
    <Routes>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='*' element={<Nopage/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path={`/Services/:id`} element={<Services/>}/>
      <Route exact path={`ServiceDetails/:id`} element={<ServiceDetails/>}/>
    </Routes>
  
      
    </>
  );
}

export default App;
