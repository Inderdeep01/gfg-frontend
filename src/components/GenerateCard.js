import { makeStyles } from '@material-ui/core';
import { Box, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import joi from 'joi'
import GeneratingNewCard from './GeneratingNewCard';
import { NetworkGradient } from '../utils/gradientAndImages';

const useStyle=makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        outline:'0px solid white',
        width:'500px',
        height:'fit-content',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        borderRadius:'20px',
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down("xs")]:{
            width:'100%',
            height:'100%',
            borderRadius:'0px'
        }
        // padding: theme.spacing(2, 4, 3),
      },
      textfield:{
        [theme.breakpoints.down("xs")]:{
            width:'55%'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
      },
      cancel:{
        width:'115px',
        height:'40px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'20px',
        // background:'#0050ff',
        border:'1px solid #1979e6',
        color:'#1979e6',
        cursor:'pointer',
        '&:hover':{
            background:'#1979e6',
            color:'white',
        }
      },
      generate:{
        width:'115px',
        height:'40px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'20px',
        background:'#1979e6',
        border:'1px solid #1979e6',
        color:'white',
        cursor:'pointer',
        '&:hover':{
            background:'#1979e6',
            color:'white',
        }
      },
      card:{
        width:'70%',
        height:'200px',
        padding:'20px',
        marginBottom:'10px',
        borderRadius:'20px',
        position:'relative',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        [theme.breakpoints.down("xs")]:{
            width:'80%',
        }
      },
      img:{
        width:'50px',
        height:'50px',
        transition:`all 0.5s ${theme.transitions.easing.easeInOut}`,
        objectFit:'contain',
        cursor:'pointer',
      },
      imgSelected:{
        cursor:'pointer',
        width:'65px',
        height:'65px',
        border:'1px solid white',
        borderRadius:'10px',
        transition:`all 0.5s ${theme.transitions.easing.easeInOut}`,
        objectFit:'contain',
      }
}))
const GenerateCard = ({open,setOpen}) => {
  useEffect(()=>{
    if(open===false){
      setPin('');
      setPurpose('');
      setErr('');
    }
  },[open])
    const {userInfo}=useSelector(state=>state.userLogin);
    const [value,setValue]=useState('IPBS');
    const classes=useStyle();
    const [purpose,setPurpose]=useState('');
    const [pin,setPin]=useState();
    const [err,setErr]=useState('');
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      const [genCard,setGenCard]=useState(false);

      const schema=joi.object({
        purpose:joi.string().required(),
        pin:joi.string().required().min(4).max(4),
      })
      const submitHandler=()=>{
        var {error}=schema.validate({purpose,pin});
        if(error){
          error=error.details[0].message.replace( /\"/g, "" );
          setErr(error);
          return;
        }
        setOpen(false);
        setGenCard(true);
      }
      useEffect(()=>{
        if(open===false && genCard==false){
          setPurpose('');
          setPin('');
          setErr('');
        }
      },[open])
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
            <Box sx={{
                width:'100%',
                height:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:'20px',
                marginBottom:'40px',
            }}>
                <h1 style={{
                    fontSize:'30px',
                    color:''
                }}>GENERATE CARD</h1>
                <Box className={classes.card} sx={{
                   background:NetworkGradient[value],
                }}>
                    <ThemeProvider theme={darkTheme}>
                        <TextField
                        id="outlined"
                        label="Purpose"
                        className={classes.textfield}
                        sx={{marginRight:'20px'}}
                        value={purpose}
                        onChange={(e)=>setPurpose(e.target.value)}
                        />
                        <TextField
                        id="outlined"
                        label="PIN"
                        type='number'
                        placeholder='****'
                        focused
                        value={pin}
                        onChange={(e)=>setPin(e.target.value)}
                        sx={{
                            width:'100px'
                        }}
                        className={classes.textfield}
                        />
                        <Box sx={{
                            width:'100%',
                            display:'flex',
                            justifyContent:'space-between',
                            marginTop:'30px',
                        }}>
                            {['IPBS','Mastercard','VISA','RuPay','Amex'].map((network)=>{
                                return (
                                    <img key={network} className={value===network?classes.imgSelected:classes.img} src={`/img/${network}.png`} onClick={()=>setValue(network)}/>
                                )
                            })}
                        </Box>
                        <Box sx={{position:'absolute',bottom:'15px',color:'white',fontSize:'12px'}}>CardHolder Name - <span style={{fontSize:'15px',fontWeight:'700'}}>{userInfo?.firstName+' '+userInfo?.lastName}</span></Box>
                    </ThemeProvider>
                </Box>
                <Box sx={{width:'100%',color:'red',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>{err}</Box>
                <Box sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'50px'
                }}>
                    <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box>
                    <Box className={classes.generate} onClick={submitHandler}>GENERATE</Box>
                </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
      <GeneratingNewCard open={genCard} setOpen={setGenCard} body={{purpose:purpose,pin:pin,network:value}}/>
    </div>
  )
}

export default GenerateCard