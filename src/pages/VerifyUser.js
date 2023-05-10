import { makeStyles } from '@material-ui/core';
import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import { URL } from '../ServerURL';

const useStyle=makeStyles((theme)=>({
    login:{
        padding:'10px',
        paddingLeft:'20px',
        paddingRight:'20px',
        background:'#19c9fb',
        width:'fit-content',
        borderRadius:'10px',
        color:'white',
        marginTop:'20px',
        cursor:'pointer',
        textDecoration:'none',
    }
}))
const VerifyUser = () => {
    const classes=useStyle();
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState('');
    const {id,token}=useParams();
    const verifyEmail=async()=>{
        setLoading(true);
        const config={
            headers:{
                'Content-Type':'application/json',
            }
        }
        try{
            const {data}=await axios.get(`${URL}/verifyUser/${id}/${token}`,config);
            setLoading(false);
            setSuccess(true);
        }catch(error){
            setLoading(false);
            setError(error?.message);
        }
    }
    useEffect(()=>{
        verifyEmail()
    },[])
  return (
    <Box sx={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{width:'300px',height:'300px',border:'1px solid lightgrey',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'}}>
        {loading?
        <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <CircularProgress />
            <Box sx={{marginTop:'10px',fontSize:'20px',fontWeight:'600'}}>Verifying Your Email</Box>
            <Box>Please wait ....</Box>
        </Box>
            :
            success?
            <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <img src="/img/verified.png" style={{width:'80px'}}/>
                <Box sx={{marginTop:'10px',fontSize:'20px',fontWeight:'600'}}>Email Verified</Box>
                <Link className={classes.login} to='/auth/login'> Login </Link>
            </Box>
            :
            <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <ErrorIcon sx={{fontSize:'50px',color:'red'}}/>
                <Box sx={{marginTop:'10px',fontSize:'20px',fontWeight:'600'}}>{error}</Box>
            </Box>
        }
        </Box>
    </Box>
  )
}

export default VerifyUser