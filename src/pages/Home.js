import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../store/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

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
    position:'relative'
  }
}))


const Home = () => {
  const classes=useStyle();
  const dispatch=useDispatch();
  const {userInfo}=useSelector(state=>state.userLogin);
  const navigate=useNavigate();
  const [side,setSide]=useState(false);

  useEffect(()=>{
    if(!userInfo){
      navigate('/auth/login');
    }
  },[dispatch,userInfo])

  return (
    <Box className={classes.outer}>
      <Navbar side={side} setSide={setSide}/>
      <Box className={classes.dashboard}>
        <Sidebar side={side} setSide={setSide}/>
        <Body/>
      </Box>
    </Box>
  )
}

export default Home