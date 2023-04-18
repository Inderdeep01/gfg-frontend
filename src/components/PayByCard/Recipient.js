import { Box, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import { NetworkImage } from '../../utils/gradientAndImages';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
}))
const Recipient = ({account,setAccount,setRecipientPage,setAmountPage,setOpen}) => {
    const handleSubmit=()=>{
        if(account){
            setRecipientPage(false);
            setAmountPage(true);
        }
    }
    const classes=useStyle();
    // console.log(account);
  return (
    <Box className={classes.outer}>
        <Box
        className={classes.back}
        onClick={() => {
          setOpen(false);
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "30px" }} />
      </Box>
        <Box sx={{fontSize:'25px',fontWeight:'600',marginTop:'40px'}}>Enter Receiver's Bank Details</Box>
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
            onChange={(e)=>setAccount(e.target.value)}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <KeyboardAltOutlinedIcon color='primary'/>
                </InputAdornment>
            ),
            }}
            sx={{
                width:'80%',
            }}
            variant="standard"
        />

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
            cursor:account?'pointer':'not-allowed'
        }}
         onClick={handleSubmit}>
          PROCEED
        </Box>
        </Box>
    </Box>
  )
}

export default Recipient