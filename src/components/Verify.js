import { Box } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
    const navigate=useNavigate();
    const {state}=useLocation();
  return (
    <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
        <Box>
            <img src='/img/email.png' style={{width:'200px'}}/>
        </Box>
        <Box sx={{color:'white',fontSize:'30px',fontWeight:'700'}}>
            Please Verify Your Email
        </Box>
        <Box sx={{color:'white',width:'85%',textAlign:'center'}}>
            You are only one step away to continue using Interplanetary Bank
        </Box>
        <Box sx={{color:'white',width:'85%',marginTop:'20px',textAlign:''}}>We have sent a verification link to <span style={{fontWeight:'bold'}}>{state?.email}</span></Box>
        <Box sx={{color:'white',width:'85%',marginTop:'20px',textAlign:'justify'}}>
            Please click on the verification link within the message to complete the verification process. If you can't find the email in your inbox, please check your spam or junk folder as well, as it may have been filtered there
        </Box>
        <Box sx={{}}>
            <Box sx={{padding:'10px',paddingLeft:'50px',paddingRight:'50px',color:'white',cursor:'pointer',background:'#6cb5de',borderRadius:'10px',marginTop:'20px',textAlign:'center'}} onClick={()=>navigate('/auth/login')}>Login</Box>
        </Box>
        <Box sx={{color:'white',marginTop:'20px',cursor:'pointer','&:hover':{color:'#6cb5de'}}}>Click here if you not recieved the verification link</Box>
    </Box>
  )
}

export default Verify