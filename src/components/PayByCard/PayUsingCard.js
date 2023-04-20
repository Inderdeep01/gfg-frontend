import { Backdrop, Box, Fade, Modal, makeStyles,CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Recipient from './Recipient';
import AmountPage from './AmountPage'
import PIN from './PIN';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const useStyle=makeStyles((theme)=>({
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
    height: "500px",
    display: "flex",
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
}))
const PayUsingCard = ({open,setOpen,card}) => {
  useEffect(()=>{
    if(open===false){
      setLoading(false);
      setError('');
      setSuccess(false);
      setPINPage(false);
      setAmountPage(false);
      setRecipientPage(true);
      setAccount('');
      setAmount('');
    }
  },[open])
  const classes=useStyle();
  const handleClose=()=>{
    setOpen(false);
  }
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState(false);

  const [recipientPage,setRecipientPage]=useState(true);
  const [amountPage,setAmountPage]=useState(false);
  const [PINPage,setPINPage]=useState(false);

  const [pinEntered,setPinEntered]=useState(false);

  const [account,setAccount]=useState('');
  const [amount,setAmount]=useState('');
  const [token,setToken]=useState('INR');
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={!loading && handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                // marginBottom: "40px",
                position: "relative",
              }}
            >
              {
                recipientPage?
                  <Recipient account={account} setAccount={setAccount} setRecipientPage={setRecipientPage} setAmountPage={setAmountPage} setOpen={setOpen}/>
                :amountPage?
                  <AmountPage amount={amount} setAmount={setAmount} account={account} setRecipientPage={setRecipientPage} setAmountPage={setAmountPage} setPINPage={setPINPage} card={card} token={token} setToken={setToken}/>
                :PINPage?
                  <PIN amount={amount} account={account} token={token} loading={loading} setLoading={setLoading} error={error} setError={setError} success={success} setSuccess={setSuccess} setAmountPage={setAmountPage} setPinPage={setPINPage} card={card} setOpen={setOpen}/>
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
                          <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Failed to Deposit Money</Box>
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
                              <Box className={classes.generate} onClick={()=>{setError('');setRecipientPage(true)}}>RETRY</Box>
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
                          position:'relative',
                          bottom:'-50px'
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
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default PayUsingCard