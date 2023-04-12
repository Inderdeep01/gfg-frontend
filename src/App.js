import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Auth from './pages/Auth';
import SplashScreen from './pages/SplashScreen';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Home from './pages/Home';
function App() {
  const [activeIndex,setActiveIndex]=useState(0);
  const [front,setFront]=useState(true);
  const {userInfo}=useSelector(state=>state.userLogin);
  return (
    <Router>
      <Routes>
        <Route path='/' element={front?<SplashScreen setFront={setFront}/>:<Home/>}/>
        <Route path='/auth' element={front?<SplashScreen setFront={setFront}/>:<Navigate to='/auth/login'/>}/>
        <Route path='/auth/:method' element={front?<SplashScreen setFront={setFront}/>:(userInfo?<Navigate to='/'/>:<Auth activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>)}/>
      </Routes>
    </Router>
  );
}

export default App;
