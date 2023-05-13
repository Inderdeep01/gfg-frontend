import { Box, Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { URL } from '../ServerURL';
import axios from 'axios';
import joi from 'joi'
const useStyle=makeStyles((theme)=>({
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
      btn:{
        color:'white',
        marginTop:'80px',
        width:'150px',
        // background:'rgb(99, 213, 196)',
        background: 'linear-gradient(0deg, rgba(78,166,141,1) 0%, rgba(26,213,169,1) 100%)',
        '& .MuiButton.label':{
          color:'white'
        },
        borderRadius:'30px',
      },
}))
const ForgetPassword = () => {
    const [email,setEmail]=useState('');
    const classes=useStyle();
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      const navigate=useNavigate()
      const [error,setError]=useState('');
      const [loading,setLoading]=useState(false);
      const [err,setErr]=useState('');

      const [success,setSuccess]=useState(false);

      const loginSchema=joi.object({
        email:joi.string().email({tlds:{allow:false}}).required(),
      })
      const handleSubmit=async()=>{
        setSuccess(false);
        setErr('');
        setError('');

        var res=loginSchema.validate({email:email.trim()});
        var er=res.error;
        if(er){
          er=er.details[0].message.replace(/"/g, "" );
          setErr(er);
          return;
        }
        setLoading(true);
        try{
          const config={
              headers:{
                  "Content-Type":'application/json',
              }
          }
          const {data}=await axios.get(`${URL}/resetPass/${email}`,config);
          setLoading(false);
          setSuccess(true);
        }catch(error){
          var e=err.response && err.response.data.message? err.response.data.message:err.message;
          setError(e);
          setLoading(false);
        }
      }
  return (
    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{width:'90%',height:'90%',position:'relative',display:success && 'flex'}}>
            <Box sx={{display:'flex',gap:'10px',color:'white',cursor:'pointer',width:'fit-content',marginBottom:'20px'}} onClick={()=>{
              setLoading(false);
              setErr('');
              setError('');
              setSuccess(false);
              navigate('/auth/login');
              }}>
                <ArrowBackIcon sx={{color:'white',fontSize:'30px'}}/>
            </Box>
            {success?
              <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',flexDirection:'column',position:'absolute'}}>
                <Box>
                    <img src='/img/email.png' style={{width:'200px'}}/>
                </Box>
                <Box sx={{color:'white',fontSize:'30px',fontWeight:'700'}}>
                    Reset Password
                </Box>
                <Box sx={{color:'white',width:'85%',marginTop:'20px',textAlign:''}}>We have sent a Password Reset link to <span style={{fontWeight:'bold'}}>{email}</span></Box>
                <Box sx={{color:'white',width:'85%',marginTop:'20px',textAlign:'justify'}}>
                    Please click on the Reset Password link within the message to Reset Password. If you can't find the email in your inbox, please check your spam or junk folder as well, as it may have been filtered there
                </Box>
                <Box sx={{}}>
                    <Box sx={{padding:'10px',paddingLeft:'50px',paddingRight:'50px',color:'white',cursor:'pointer',background:'#6cb5de',borderRadius:'10px',marginTop:'20px',textAlign:'center'}} onClick={()=>navigate('/auth/login')}>Login</Box>
                </Box>
            </Box>
          :
            <Box sx={{width:'100%',height:'100%',alignItems:'center',display:'flex',flexDirection:'column'}}>
                <Box sx={{fontSize:'30px',color:'white'}}>Forget Password</Box>
                <ThemeProvider theme={darkTheme}>
                <Box sx={{marginTop:'40px',width:'80%',display:'flex',justifyContent:'center'}}>
                    <TextField
                    label="E-Mail"
                    variant="filled"
                    color="success"
                    value={email}
                    onKeyUp={(e)=>{
                      if(e.key==='Enter'){
                        if(email){
                          handleSubmit();
                        }
                      }
                    }}
                    onFocus={()=>{setErr('');setError('')}}
                    onChange={(e)=>{setEmail(e.target.value);}}
                    className={classes.input}
                    helperText={<span style={{color:'red'}}>{err}</span>}
                    />
                </Box>
                <Button variant='contained' className={classes.btn} onClick={handleSubmit}>Submit</Button>
                <Box sx={{marginTop:'20px',color:'red'}}>{error}</Box>
                </ThemeProvider>
            </Box>
          }
        </Box>
    </Box>
  )
}

export default ForgetPassword