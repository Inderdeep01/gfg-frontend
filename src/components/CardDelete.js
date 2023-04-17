import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../ServerURL';
import { GET_CARDS_SUCCESS } from '../store/Constants/cardConstants';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            width:'40%'
        },
        [theme.breakpoints.down("sm")]:{
            width:'50%'
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
        '&:hover':{
            background:'red',
            border:'1px solid red',
            color:'white',
        }
      },
}))
const CardDelete = ({open,setOpen,card}) => {
    useEffect(()=>{
        if(open==false){
            setLoading(false);
            setErr('');
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
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async()=>{
        setErr('');
        setLoading(true);
        try
        {
            const config={
                headers:{
                    "Content-Type":'application/json',
                    'Authorization':`Bearer ${userInfo?.token}`
                }
            }
            console.log(card.cardNumber);
            const {data}=await axios.delete(`${URL}/card/${card.cardNumber}`,config);
            const newCardList=cards?.filter((c)=>c._id!==card._id);
            dispatch({type:GET_CARDS_SUCCESS,payload:newCardList});
            setLoading(false);
            setOpen(false);
            navigate('/');
        }
        catch(err)
        {
            var e=err.response && err.response.data.message? err.response.data.message:err.message;
            setLoading(false);
            setErr(e);
        }
    }
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
                    <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Deleting Your Card...</Box>
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
                    <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Card Deletion Failed</Box>
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
                        <Box className={classes.generate} onClick={()=>{
                          handleSubmit();
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
                <Box sx={{fontSize:'18px',color:'#1979e6'}}>Are you sure you want to delete this card?</Box>
                <Box sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'50px'
                }}>
                    <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box>
                    <Box className={classes.generate} onClick={handleSubmit}>DELETE</Box>
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

export default CardDelete