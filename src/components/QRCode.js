import { Backdrop, Box, Fade, Modal, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import {QRLine} from 'react-qrbtf'
import { NetworkImage } from "../utils/gradientAndImages";
import CloseIcon from '@mui/icons-material/Close';
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
    width: "450px",
    height: "450px",
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
  close:{
    display:'none',
    cursor:'pointer',
    [theme.breakpoints.down("xs")]:{
        display:'flex'
    }
  },
  info:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'30px'
  },
  img:{
    width:'20px'
  }
}));
const QRCode = ({ open, setOpen}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const {userInfo}=useSelector(state=>state.userLogin);
  const classes = useStyle();

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
            <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Box className={classes.close} sx={{position:'absolute',top:'30px',right:'20px'}}><CloseIcon sx={{fontSize:'35px',color:'#'}} onClick={()=>setOpen(false)}/></Box>
                <Box className={classes.info}>
                    <Box sx={{fontSize:'25px',fontWeight:'600'}}>{userInfo?.firstName} {userInfo?.lastName?userInfo.lastName:''} <img src="/img/verified.png" className={classes.img}/></Box>
                    <Box>A/C - {userInfo?.accountNo.substr(0,4)} XXXX {userInfo?.accountNo.substr(userInfo?.accountNo?.length-4,userInfo?.accountNo?.length)}</Box>
                </Box>
                <QRLine 
                styles={{svg:{width:'350px',height:'350px'}}}
                lineWidth={50}
                value={`https://interplanetarybank.org/pay/${userInfo?._id}`}
                posType="roundRect"
                level="M"
                direction="h-v"
                // posColor="#7b7c7e"
                lineColor="#7b7c7e"
                lineOpacity={75}
                icon={NetworkImage['IPBS']}
                />
                <Box sx={{fontSize:'20px',fontWeight:'500',}}>Scan the Above Qr Code to Pay</Box>
                <Box sx={{width:'80%',textAlign:'center',marginBottom:'30px',fontSize:'12px'}}>Payment made to this QR will be recieved in your bank account (Interplanatery Bank {userInfo?.accountNo.substr(0,4)} XXXX {userInfo?.accountNo.substr(userInfo?.accountNo?.length-4,userInfo?.accountNo?.length)})</Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default QRCode;
