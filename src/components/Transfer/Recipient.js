import { Box, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import { NetworkImage } from '../../utils/gradientAndImages';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '../../ServerURL';
import PersonIcon from '@mui/icons-material/Person';
import Loading from '../Loading';
import { useLocation, useNavigate } from 'react-router-dom';
const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        // border:'1px solid red',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    generate:{
        width: "80%",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        // border: "1px solid #1979e6",
        color: "white",
        cursor: "pointer",
        // "&:hover": {
        // background: "#1979e6",
        // color: "white",
        // },
    },
    back: {
        width: "fit-content",
        cursor: "pointer",
        padding: "5px",
        position: "absolute",
        left: "15px",
        top: "20px",
        color: "rgb(25, 121, 230)",
      },
      div:{
        [theme.breakpoints.down("xs")]:{
          marginTop:'80px'
        }
      }
}))
const Recipient = ({account,setAccount,setRecipientPage,setAmountPage,setOpen,to,setTo}) => {
  const [loading,setLoading]=useState(false);
  const {userInfo}=useSelector(state=>state.userLogin)
  const [err,setErr]=useState('');
  const handleSubmit=async()=>{
    if(account && to){
          setRecipientPage(false);
          setAmountPage(true);
    }
    else{
      const config={
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${userInfo?.token}`
        }
      }
      try{
        setLoading(true);
        const {data}=await axios.post(`${URL}/details`,{accountNo:account},config);
        if(data===null){
          setErr('Invalid Account Number');
          setTo(null);
        }
        else{
          setTo(data);
          setErr('');
          console.log(data);
        }
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    }
    const classes=useStyle();
    // console.log(account);
    const navigate=useNavigate();
    const page=useLocation().pathname;
  return (
    <Box className={classes.outer}>
        <Box
        className={classes.back}
        onClick={() => {
          if(page==='/pay'){
            navigate('/');
          }
          setOpen(false);
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "30px" }} />
      </Box>
        <Box sx={{fontSize:'25px',fontWeight:'600',marginTop:'40px'}} className={classes.div}>Enter Receiver's Bank Details</Box>
        <Box sx={{
            width:'100%',
            height:'100%',
            display:'flex',
            marginTop:'30px',
            flexDirection:'column',
            alignItems:'center',
            gap:'50px'
        }}>
            <TextField
            id="input-with-icon-textfield"
            label="Bank"
            value="Inter Planetary Bank"
            disabled
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <img src={NetworkImage['IPBS']} width={30} height={30}/>
                </InputAdornment>
            ),
            }}
            sx={{
                width:'80%',
            }}
            variant="standard"
        />
        <TextField
            id="input-with-icon-textfield"
            label="Enter Bank Account"
            value={account}
            onChange={(e)=>{setAccount(e.target.value);setTo(null)}}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <KeyboardAltOutlinedIcon color='primary'/>
                </InputAdornment>
            ),
            }}
            helperText={<span style={{color:'red'}}>{err}</span>}
            sx={{
                width:'80%',
            }}
            variant="standard"
        />
        {to && 
        <TextField
            id="input-with-icon-textfield"
            label="Account Holder"
            value={to?.firstName+ ' ' + (to?.lastName?to?.lastName:'')}
            disabled
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <PersonIcon color='primary'/>
                </InputAdornment>
            ),
            }}
            sx={{
                width:'80%',
            }}
            variant="standard"
        />
        }

        </Box>
        <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          position: "absolute",
          bottom: "30px",
        }}
      >
        {/* <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box> */}
        <Box className={classes.generate}
        sx={{
            background:account?'#1979e6':'lightgrey',
            // background:'lightgrey',
            cursor:account?'pointer':'not-allowed'
        }}
         onClick={handleSubmit}>
          {loading?
          <Loading/>:
          to?'PROCEED TO PAY':'VERIFY A/C NO.'}
        </Box>
        </Box>
    </Box>
  )
}

export default Recipient