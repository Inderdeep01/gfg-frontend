import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Auth from './pages/Auth';
import SplashScreen from './pages/SplashScreen';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import VerifyUser from './pages/VerifyUser';
import ResetPassword from './pages/ResetPassword';
function App() {
  const [activeIndex,setActiveIndex]=useState(0);
  const [front,setFront]=useState(true);
  const {userInfo}=useSelector(state=>state.userLogin);
  const [prevRoute,setPrevRoute]=useState('');
  return (
    <Router>
      <Routes>
        <Route path='/auth' element={front?<SplashScreen setFront={setFront}/>:<Navigate to='/auth/login'/>}/>
        <Route path='/auth/:method' element={front?<SplashScreen setFront={setFront}/>:(userInfo?(prevRoute?<Navigate to={prevRoute}/>:<Navigate to='/'/>):<Auth activeIndex={activeIndex} setActiveIndex={setActiveIndex} setPrevRoute={setPrevRoute}/>)}/>
        <Route path='/verifyUser/:id/:token' element={<VerifyUser/>} />
        <Route path='/resetPass/:id/:token' element={<ResetPassword/>}/>
        <Route path='/'  element={front?<SplashScreen setFront={setFront}/>:<Home/>}/>
        {/* <Route path='/' element={<SplashScreen setFront={setFront}/>}/> */}
        <Route path='/:page'  element={front?<SplashScreen setFront={setFront}/>:<Home/>}/>
        <Route path='/pay/:id' element={front?<SplashScreen setFront={setFront} /> :<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
