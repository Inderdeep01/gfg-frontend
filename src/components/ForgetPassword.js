import { Box, Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  return (
    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{width:'90%',height:'90%'}}>
            <Box sx={{display:'flex',gap:'10px',color:'white',cursor:'pointer',width:'fit-content',marginBottom:'20px'}} onClick={()=>navigate('/auth/login')}>
                <ArrowBackIcon sx={{color:'white',fontSize:'30px'}}/>
            </Box>
            <Box sx={{width:'100%',height:'100%',alignItems:'center',display:'flex',flexDirection:'column'}}>
                <Box sx={{fontSize:'30px',color:'white'}}>Forget Password</Box>
                <ThemeProvider theme={darkTheme}>
                <Box sx={{marginTop:'40px',width:'80%',display:'flex',justifyContent:'center'}}>
                    <TextField
                    label="E-Mail"
                    variant="filled"
                    color="success"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    className={classes.input}
                    />
                </Box>
                <Button variant='contained' className={classes.btn}>Submit</Button>
                </ThemeProvider>
            </Box>
        </Box>
    </Box>
  )
}

export default ForgetPassword