import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';
import { Box, CircularProgress, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../ServerURL';
import { GET_CARDS_SUCCESS } from '../store/Constants/cardConstants';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        width:'30%',
        height:'fit-content',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        borderRadius:'15px',
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down("md")]:{
            width:'50%'
        },
        [theme.breakpoints.down("sm")]:{
            width:'60%'
        },
        [theme.breakpoints.down("xs")]:{
            width:'80%',
            height:'fit-content',
        }
        // padding: theme.spacing(2, 4, 3),
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
        background:'white',
        border:'1px solid #1979e6',
        color:'#1979e6',
        cursor:'pointer',
      },
}))

const ChangePin = ({open,setOpen,card}) => {
    useEffect(()=>{
        if(open==false){
            setLoading(false);
            setErr('');
            setSuccess(false);
            setNewPin('');
            setOldPin('');
        }
    },[open])
    const classes=useStyle();
    const handleClose = () => {
        setOpen(false);
    };

    const {userInfo}=useSelector(state=>state.userLogin);
    const {cards}=useSelector(state=>state.cardsList);


    const [err,setErr]=useState('');
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);
    const handleSubmit=async()=>{
        setErr('');
        setLoading(true);
        setSuccess(false);
        try
        {
            const config={
                headers:{
                    "Content-Type":'application/json',
                    'Authorization':`Bearer ${userInfo?.token}`
                }
            }
            // console.log(card.cardNumber);
            const {data}=await axios.patch(`${URL}/card`,{
                action:'changePIN',
                cardNumber:card.cardNumber,
                oldPin:oldPin,
                newPin:newPin
            },config);
            setLoading(false);
            setSuccess(true);
        }
        catch(err)
        {
            var e=err.response && err.response.data.message? err.response.data.message:err.message;
            setLoading(false);
            setErr(e);
            setSuccess(false);
        }
    }
    const [oldPin,setOldPin]=useState('');
    const [newPin,setNewPin]=useState('');


    const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (e) => {
    e.preventDefault();
  };
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
            <Box sx={{
                width:'100%',
                height:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:'20px',
                marginBottom:'40px',
                marginTop:'40px'
            }}>
                {loading?
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
                    <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Changing Your Card PIN...</Box>
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
                    <Box sx={{color:'green',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Card PIN Changed Successfully</Box>
                    {/* <Box sx={{color:'red'}}>{err}</Box> */}
                    <Box sx={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:'50px',
                        position:'relative',
                        bottom:'-50px'
                    }}>

                    </Box>
                </Box>
                :
                err?
                <Box sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    marginBottom:'10px',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                }}>
                    <GppMaybeIcon sx={{fontSize:'50px',color:'red'}}/>
                    <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Changing Card PIN Failed</Box>
                    <Box sx={{color:'red'}}>{err}</Box>
                    <Box sx={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:'50px',
                        position:'relative',
                        bottom:'-50px',
                        marginBottom:'20px',
                    }}>
                        <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box>
                        <Box className={classes.generate} sx={{
                            '&:hover':{
                                background:'#1979e6',
                                border:'1px solid #1979e6',
                                color:'white',
                            }
                        }} onClick={()=>{
                            setErr('');
                        }}>RETRY</Box>
                    </Box>
                </Box>
                :
                <Box sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'30px',
                    flexDirection:'column'
                }}>
                    <Box sx={{fontSize:'30px',fontWeight:'500'}}>Change PIN</Box>
                            <FormControl variant="filled" className={classes.input}>
                            <InputLabel htmlFor="filled-adornment-password" color='success'>Old PIN</InputLabel>
                            <FilledInput
                            id="filled-adornment-password"
                            value={oldPin}
                            onChange={(e)=>{setOldPin(e.target.value)}}
                            type={showPassword ? 'text' : 'password'}
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
                        </FormControl>
                        <FormControl variant="filled" className={classes.input}>
                            <InputLabel htmlFor="filled-adornment-password" color='success'>New PIN</InputLabel>
                            <FilledInput
                            id="filled-adornment-password"
                            value={newPin}
                            onChange={(e)=>{setNewPin(e.target.value)}}
                            type={showPassword1 ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}
                                edge="end"
                                >
                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
                <Box sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'50px'
                }}>
                    <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box>
                    <Box className={classes.generate}
                    sx={{
                        '&:hover':{
                            background:'red',
                            border:'1px solid red',
                            color:'white',
                        }
                    }}
                    onClick={handleSubmit}>Change PIN</Box>
                </Box>
            </Box>
            }
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChangePin