import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../store/Actions/userActions'
import { URL } from '../ServerURL'
const useStyles=makeStyles((theme)=>({
  outer:{
    width:'100%',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  loadBox:{
    width:'500px',
    height:'300px',
    [theme.breakpoints.down("xs")]:{
      width:'100%',
    },
    // border:'2px solid red',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  logo:{
    width:'70%',
    marginBottom:'30px'
  }
}))
const SplashScreen = ({setFront}) => {
  const classes=useStyles();
  const [progress,setProgress]=useState(0);
  const {userInfo}=useSelector(state=>state.userLogin);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const authToken=async()=>{
    setProgress(35);
    if(userInfo){
      try{
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${userInfo.token}`
            }
        }
        setProgress(70);
        const {data}=await axios.get(`${URL}/authToken`,config);
        console.log(data);
        if(data.message==='Token Verified'){
          setProgress(100);
          setTimeout(()=>{
            setFront(false);
          },800);
        }
      }catch(error){
        setProgress(100);
        setTimeout(()=>{
          setFront(false);
        },800);
        dispatch(logout());
        navigate('/auth/login');
      }
    }
    else{
      setProgress(90);
      setTimeout(()=>{
        setFront(false);
      },1500);
      navigate('/auth/login');
    }
  }

  useEffect(()=>{
    authToken();
  },[])

  return (
    <Box className={classes.outer}>
      <Box className={classes.loadBox}>
        <img src="/img/logo.png" className={classes.logo}/>
        <LinearProgress sx={{
          width:'80%',
        }} color='secondary' variant='determinate' value={progress}/>
      </Box>
    </Box>
  )
}
export default SplashScreen