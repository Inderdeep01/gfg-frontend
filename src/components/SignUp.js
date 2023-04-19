import { FormHelperText, makeStyles } from '@material-ui/core'
import { Box, Button, CircularProgress, IconButton, InputAdornment, InputLabel, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {Visibility,VisibilityOff} from '@mui/icons-material';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import joi from 'joi';
import { signup } from '../store/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const useStyle=makeStyles((theme)=>({
  outer:{
    height:'100%',
    width:'100%',
    position:'relative',
  },
  inner:{
    paddingTop:'15px',
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
    position:'absolute',
    bottom:'100px',
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
  }
}))
const SignUp = () => {
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


  const[name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [otherErr,setOtherErr]=useState('');
  const [err,setErr]=useState({
    for:'',
    message:''
  });


  const {loading,userInfo,error}=useSelector(state=>state.userSignup);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(error){
      var er=error.split(" ")[0];
      if(er==='email' || er==='password'){
        setErr({
          for:er,
          message:error,
        })
      }
      else{
        setOtherErr(error);
      }
      dispatch({type:'REMOVE_SIGNUP_ERROR'});
    }
  },[dispatch,error])

  const signupSchema=joi.object({
    name:joi.string().required().min(3),
    email:joi.string().email({tlds:{allow:false}}).required(),
    password:joi.string().min(8).required()
  })
  const handleSubmit=async()=>{
    var res=signupSchema.validate({name,email:email.trim(),password});
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
      var arr=name.split(" ");
      var firstName=arr[0];
      var lastName=arr[1];
      dispatch(signup(firstName,lastName,email.trim(),password));
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
    <Box className={classes.outer}>
      <Box className={classes.inner}>
      <TextField
          label="Name"
          variant="filled"
          color="success"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          className={classes.input}
          helperText={err.for==='name'?err.message:''}
          error={err.for==='name'?true:false}
          onFocus={()=>{setErr({
            for:'',
            message:''
          });
          setOtherErr('');
        }}
          />
          <TextField
          label="E-Mail"
          variant="filled"
          color="success"
          value={email}
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
            id="filled-adornment-password"
            color='success'
            value={password}
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
          <Box className={classes.submitbox}>
            <Button sx={{color:'white',borderRadius:'20px',width:'100px'}} variant="contained" className={classes.submit} onClick={handleSubmit} disabled={loading?true:false}>{loading?<CircularProgress size="25px" color="inherit" />:'Sign Up'}</Button>
          </Box>
          <Box sx={{
            position:'absolute',
            color:'red',
            bottom:'35px',
            display:'flex',
            justifyContent:'center',
            width:'88%',
          }}>{otherErr}</Box>
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default SignUp;