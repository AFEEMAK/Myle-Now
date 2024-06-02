import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Nopage from './pages/NoPage';
import Register from './pages/Register';
import Services from './pages/Services';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Nopage' element={<Nopage/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Services' element={<Services/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
