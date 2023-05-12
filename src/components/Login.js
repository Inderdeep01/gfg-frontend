import { FormHelperText, makeStyles } from '@material-ui/core'
import { Box, Button, CircularProgress, IconButton, InputAdornment, InputLabel, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import {Visibility,VisibilityOff} from '@mui/icons-material';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/Actions/userActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const useStyle=makeStyles((theme)=>({
  outer:{
    height:'100%',
    width:'100%',
  },
  inner:{
    paddingTop:'35px',
    width:'88%',
    height:'75%',
    marginLeft:'60px',
    display:'flex',
    flexDirection:'column',
    gap:'30px',
    position:'relative'
  },
  input:{
    width:'88%',
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
    },
    "& .MuiFilledInput-root:hover": {
      // backgroundColor: "rgb(250, 232, 241)",
      // Reset on touch devices, it doesn't add specificity
      // "@media (hover: none)": {
      //   backgroundColor: "rgb(232, 241, 250)"
      // },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      // backgroundColor: "rgb(250, 241, 232)"
    }
  },
  submitbox:{
    marginTop:'30px',
    // position:'absolute',
    // bottom:'170px',
    // border:'1px solid white',
    width:'100%',
  },
  submit:{
    // background:'rgb(99, 213, 196)',
    background: 'linear-gradient(0deg, rgba(78,166,141,1) 0%, rgba(26,213,169,1) 100%)',
    '& .MuiButton.label':{
      color:'white'
    },
    borderRadius:'30px',
  },
}))
const Login = ({setPrevRoute}) => {
  const classes=useStyle();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [otherErr,setOtherErr]=useState('');
  const [err,setErr]=useState({
    for:'',
    message:''
  });

  const {loading,userInfo,error}=useSelector(state=>state.userLogin);
  const dispatch=useDispatch();
  const naviagte=useNavigate();
  const {state}=useLocation();
  useEffect(()=>{
    if(state){
      setPrevRoute(state?.prevRoute);
    }
  },[state])
  
  useEffect(()=>{
    if(error){
      var er=error.split(" ")[0];
      if(er==='email' || er==='password'){
        setErr({
          for:er,
          message:error,
        })
      }
      else if(error==='Please verify your email first'){
        naviagte('/auth/verify',{
          state:{
            email:email
          }
        })
      }
      else{
        setOtherErr(error);
      }
      dispatch({type:'REMOVE_LOGIN_ERROR'});
    }
  },[dispatch,error])
  const loginSchema=joi.object({
    email:joi.string().email({tlds:{allow:false}}).required(),
    password:joi.string().min(8).required()
  })
  const handleSubmit=async()=>{
    var res=loginSchema.validate({email:email.trim(),password});
    var er=res.error;
    if(er){
      er=er.details[0].message.replace(/"/g, "" );
      var f=er.split(" ")[0];
      setErr({
        for:f,
        message:er
      })
    }
    else{
      dispatch(login(email.trim(),password));
    }
  }
  const passRef=useRef();
  const navigate=useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
    <Box className={classes.outer}>
      <Box className={classes.inner}>
        <form style={{display:'flex',flexDirection:'column',gap:'30px'}}>
          <TextField
          label="E-Mail"
          variant="filled"
          color="success"
          value={email}
          onKeyUp={(e)=>{
            if(e.key==='Enter'){
              passRef.current.click()
            }
          }}
          onChange={(e)=>{setEmail(e.target.value)}}
          className={classes.input}
          helperText={err.for==='email'?err.message:''}
          error={err.for==='email'?true:false}
          onFocus={()=>{setErr({
            for:'',
            message:''
          });
          setOtherErr('');
        }}
          />
          <FormControl variant="filled" className={classes.input}>
            <InputLabel htmlFor="filled-adornment-password" color='success'>Password</InputLabel>
            <FilledInput
            ref={passRef}
            id="filled-adornment-password"
            color='success'
            value={password}
            onKeyUp={(e)=>{
              if(e.key==='Enter'){
                if(email && password){
                  handleSubmit();
                }
              }
            }}
            onChange={(e)=>{setPassword(e.target.value)}}
            error={err.for==='password'?true:false}
            type={showPassword ? 'text' : 'password'}
            onFocus={()=>{setErr({
              for:'',
              message:''
            });
            setOtherErr('');
          }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={err.for==='password'?true:false}>{err.for==='password'?err.message:''}</FormHelperText>
          </FormControl>
          </form>
          <Box className={classes.submitbox}>
            <Button sx={{color:'white',borderRadius:'20px',width:'100px'}} variant="contained" className={classes.submit} onClick={handleSubmit} disabled={loading?true:false}>{loading?<CircularProgress size="25px" color="inherit" />:'Login'}</Button>
          </Box>
          <Box sx={{textDecoration:'none',color:'white',cursor:'pointer','&:hover':{color:'#36bb99'}}} className={classes.forget} onClick={()=>navigate('/auth/forgetPassword')}>Forget Password?</Box>
          <Box sx={{
            position:'absolute',
            color:'red',
            bottom:'70px',
            display:'flex',
            justifyContent:'center',
            width:'88%',
          }}>{otherErr}</Box>
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default Login