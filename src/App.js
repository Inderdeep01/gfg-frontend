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
        <Route path='/auth' element={front?<SplashScreen setFront={setFront}/>:<Navigate to='/auth/login'/>}/>
        <Route path='/auth/:method' element={front?<SplashScreen setFront={setFront}/>:(userInfo?<Navigate to='/'/>:<Auth activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>)}/>
        {/* <Route path='/pay/:userid' element={front?<SplashScreen setFront={setFront}/>:<PayQR/>}/> */}
        <Route path='/'  element={front?<SplashScreen setFront={setFront}/>:<Home/>}/>
        {/* <Route path='/' element={<SplashScreen setFront={setFront}/>}/> */}
        <Route path='/:page'  element={front?<SplashScreen setFront={setFront}/>:<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
