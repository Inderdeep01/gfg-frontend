import React, { useEffect } from 'react'
import { Box } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Verify from '../components/Verify';
import ForgetPassword from '../components/ForgetPassword';

const useStyle=makeStyles((theme)=>({
    root:{
        width:'100%',
        height:'100vh',
        border:'red',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'url(https://media.istockphoto.com/id/165489882/vector/air-flow.jpg?s=612x612&w=0&k=20&c=63djVUrVTyBCpFRN1r5STD9lddHjrP2XXDqTCHzYy-E=)',
        // background:'url(https://cdn2.f-cdn.com/contestentries/2046262/59234771/61ee720c6a10a_thumb900.jpg)',
        backgroundSize:'cover'
    },
    authBox:{
      height:'80%',
      width:'70%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:'20px',
      [theme.breakpoints.down("xs")]:{
        width:'100%',
        height:'100%',
        borderRadius:'0px',
        overflow:'hidden'
      },
    },
    carousel:{
      width:'50%',
      height:'100%',
      display:'flex',
      overflow:'hidden',
      justifyContent:'center',
      alignItems:'center',
      borderTopLeftRadius:'20px',
      borderBottomLeftRadius:'20px',
      [theme.breakpoints.down("sm")]:{
        display:'none',
      },
    },
    auth:{
      width:'50%',
      height:'100%',
      overflow:'hidden',
      borderTopRightRadius:'20px',
      borderBottomRightRadius:'20px',
      borderLeft:'1px solid white',
      // background: 'rgb(55,76,103)',
      background: 'linear-gradient(180deg, rgba(55,76,103,1) 0%, rgba(35,48,65,1) 100%)',
      [theme.breakpoints.down("sm")]:{
        width:'100%',
        borderRadius:'20px',
      },
      [theme.breakpoints.down("xs")]:{
        borderRadius:'0px',
        border:'0px solid white'
      },

    },
    upperdiv:{
      width:'100%',
      height:'80px',
      position:'relative'
    },
    wrapbtn:{
      width:'fit-content',
      height:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:'50px',
      overflow:'hidden',
      background:'rgb(89, 106, 128)',
      position:'absolute',
      top:'15px',
      right:'15px',
      boxShadow:'rgb(38, 57, 77) 0px 20px 30px -10px',
    },
    btn:{
      background:'rgb(89, 106, 128)',
      padding:'5px',
      cursor:'pointer',
      color:'lightgrey',
      paddingLeft:'15px',
      paddingRight:'15px',
      textDecoration:'none',
      fontWeight:'200',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    active:{
      textDecoration:'none',
      // background:'rgb(99, 213, 196)',
      background: 'linear-gradient(0deg, rgba(78,166,141,1) 0%, rgba(26,213,169,1) 100%)',
      color:'white',
      paddingLeft:'12px',
      paddingRight:'12px',
      padding:'5px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    heading:{
      width:'100%',
      // border:'1px solid white',
      display:'flex',
      justifyContent:'center',
      // alignItems:'center',
      flexDirection:'column',
    },
    inheading:{
      marginLeft:'60px',
      display:'flex',
      alignItems:'center',
      color:'lightgrey',
      fontWeight:'200',
      fontSize:'25px',
      gap:'20px',
    },
    activehead:{
      color:'white',
      fontWeight:'bold',
      transition:'all 0.1s',
    },
    borderBt:{
      height:'15px',
      // borderImage:'linear-gradient(0deg, rgba(78,166,141,1) 0%, rgba(26,213,169,1) 100%)',
      borderBottom:'2px solid rgb(33, 206, 165)',
    }
}))

const Auth = ({activeIndex,setActiveIndex,setPrevRoute}) => {
    const classes=useStyle();
    const {method}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
      if(method!=='login' && method!=='signup' && method!=='verify' && method!=='forgetPassword'){
        navigate('/auth/login');
      }
    },[method,navigate])
  return (
    <Box className={classes.root}>
      <Box className={classes.authBox}>
        <Box className={classes.carousel}>
          <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </Box>
        <Box className={classes.auth}>
          {method!=='verify' && method!=='forgetPassword' && 
          <Box className={classes.upperdiv}>
            <Box className={classes.wrapbtn}>
              <Link to='/auth/login' className={`${method==='login'?classes.active:classes.btn}`}>Login</Link>
              <Link to='/auth/signup' className={`${method==='signup'?classes.active:classes.btn}`}>Sign Up</Link>  
            </Box>
          </Box>
          }
          {method!=='verify' && method!=='forgetPassword' &&
          <Box className={classes.heading}>
            <Box className={classes.inheading}>
              <Box className={`${method==='login' && classes.activehead}`} sx={{cursor:'pointer'}} onClick={()=>{navigate('/auth/login')}}>Login</Box>
              <Box>or</Box>
              <Box className={`${method==='signup' && classes.activehead}`} sx={{cursor:'pointer'}} onClick={()=>{navigate('/auth/signup')}}>Sign Up</Box>
            </Box>
            <Box
            style={{
              transition:'all 1s',
              width:method==='login'?'80px':'110px',
              transform:method==='login'?'translate(50px)':'translate(170px)',
            }}
             className={classes.borderBt}></Box>
          </Box>
          }
          <Box style={{
            width:'100%',
            height:'100%',
          }}>
            {method==='login'?<Login setPrevRoute={setPrevRoute}/>:method==='signup'?<SignUp/>:method==='forgetPassword'?<ForgetPassword/>:<Verify/>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Auth