import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../store/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Navbar from '../components/Navbar';

const useStyle=makeStyles((theme)=>({
  outer:{
    width:'100%',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  dashboard:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
}))
const Home = () => {
  const classes=useStyle();
  const dispatch=useDispatch();
  const {userInfo}=useSelector(state=>state.userLogin);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo){
      navigate('/auth/login');
    }
  },[dispatch,userInfo])
  return (
    <Box className={classes.outer}>
      <Navbar/>
      <Box className={classes.dashboard}>
      </Box>
    </Box>
  )
}

export default Home