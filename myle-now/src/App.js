import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';


function App() {
  return (
    <>
   
    <Routes>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='*' element={<Nopage/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Services' element={<Services/>}/>
    </Routes>
  
      
    </>
  );
}

export default App;
