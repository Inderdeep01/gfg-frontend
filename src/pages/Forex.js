import { Backdrop, Box, Fade, InputLabel, Modal, Switch, TextField, makeStyles, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ForexOTP from "../components/ForexOTP";
import ForexExchange from "../components/ForexExchange";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress } from "@mui/material";
const useStyle = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    outline: "0px solid white",
    width: "500px",
    height: "550px",
    display: "flex",
    position:'relative',
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
    },
    // padding: theme.spacing(2, 4, 3),
  },
  cancel: {
    width: "115px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    // background:'#0050ff',
    border: "1px solid #1979e6",
    color: "#1979e6",
    cursor: "pointer",
    "&:hover": {
      background: "#1979e6",
      color: "white",
    },
  },
  generate: {
    width: "115px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    background: "#1979e6",
    // border: "1px solid #1979e6",
    color: "white",
    cursor: "pointer",
  },
  close:{
    width: "80%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    background: "#1979e6",
    // border: "1px solid #1979e6",
    color: "white",
    cursor: "pointer",
  }
}));

const Forex = ({ open, setOpen}) => {
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    if(open===false){
      setExchangePage(true);
      setTid('');
      setLoading(false);
      setAccount('');
      setSuccess(false);
      setError('');
      setTxObj({});
    }
  },[open])
  const classes=useStyle();
  const [exchangePage,setExchangePage]=useState(true);
  const [tid,setTid]=useState('');
  const [otp,setOtp]=useState(false);
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState('');
  const [txObj,setTxObj]=useState({});
  const [transfer,setTransfer]=useState(false);
  const [account,setAccount]=useState('');
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {exchangePage?
          <ForexExchange open={open} setOpen={setOpen} setTid={setTid} setOtp={setOtp} setTxObj={setTxObj} transfer={transfer} setTransfer={setTransfer} setExchangePage={setExchangePage} account={account} setAccount={setAccount}/>  
          :otp?
          <ForexOTP setExchangePage={setExchangePage} setLoading={setLoading} setSuccess={setSuccess} setError={setError} tid={tid} txObj={txObj} setOtp={setOtp} account={account}/>
          :
          loading?
                  <Box sx={{
                      width:'100%',
                      height:'100%',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      flexDirection:'column',
                  }}> 
                      <CircularProgress size={50} sx={{
                          color:'rgb(25, 120, 228)',
                      }}/>
                      <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Processing Your Payment...</Box>
                      <Box sx={{color:'rgb(25, 120, 228)'}}>Have Patience</Box>
                  </Box>
                  :
                  error?
                      <Box sx={{
                          width:'100%',
                          height:'100%',
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          flexDirection:'column',
                      }}>
                          <GppMaybeIcon sx={{fontSize:'50px',color:'red'}}/>
                          <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Payment Failed</Box>
                          <Box sx={{color:'red'}}>{error}</Box>
                          <Box sx={{
                              width:'100%',
                              display:'flex',
                              justifyContent:'center',
                              alignItems:'center',
                              gap:'50px',
                              position:'relative',
                              bottom:'-50px'
                          }}>
                              <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box>
                              <Box className={classes.generate} onClick={()=>{setError('');setOtp(false);setExchangePage(true)}}>RETRY</Box>
                          </Box>
                      </Box>
                  :
                  success?
                  <Box sx={{
                      width:'100%',
                      height:'100%',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      flexDirection:'column',
                  }}>
                      <CheckCircleIcon sx={{fontSize:'50px',color:'green'}}/>
                      <Box sx={{color:'green',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Payment Successfull</Box>
                      {/* <Box sx={{color:'red'}}>{error}</Box> */}
                      <Box sx={{
                          width:'100%',
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          gap:'50px',
                          position:'absolute',
                          bottom:'50px'
                      }}>
                        <Box className={classes.close}
                          onClick={()=>setOpen(false)}>
                            Close
                          </Box>
                      </Box>
                  </Box>
                  :
                <></>
          }
          </div>
        </Fade>
      </Modal>
      </div>
  );
};

export default Forex;
