import { Backdrop, CircularProgress, Fade, Modal, makeStyles } from '@material-ui/core'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '../ServerURL';
import { GET_CARDS_SUCCESS } from '../store/Constants/cardConstants';

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
        height:'500px',
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
}))
const GeneratingNewCard = ({open,setOpen,body}) => {
    const classes=useStyle();
    const handleClose=()=>{
        setOpen(false);
    }
    const {userInfo}=useSelector(state=>state.userLogin)
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false);
    const dispatch=useDispatch();
    const {cards}=useSelector(state=>state.cardsList);
    const generateNewCard=async()=>{
        setError('');
        setSuccess(false);
        setLoading(true);
        try
            {
                const config={
                    headers:{
                        "Content-Type":'application/json',
                        'Authorization':`Bearer ${userInfo.token}`
                    }
                }
                const {data}=await axios.post(`${URL}/card`,body,config);
                setLoading(false);
                setSuccess(true);
                dispatch({
                    type:GET_CARDS_SUCCESS,
                    payload:[...cards,data.card]
                })
            }
            catch(err)
            {
                var e=err.response && err.response.data.message? err.response.data.message:err.message;
                setLoading(false);
                setError(e);
            }
    }
    useEffect(()=>{
        if(open){
            generateNewCard();
        }
    },[open]);
  return (
    <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={success && handleClose}
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
                {loading &&
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
                    <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Generating New Card For You...</Box>
                    <Box sx={{color:'rgb(25, 120, 228)'}}>Have Patience</Box>
                </Box>
                }
                {error && 
                    <Box sx={{
                        width:'100%',
                        height:'100%',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'column',
                    }}>
                        <GppMaybeIcon sx={{fontSize:'50px',color:'red'}}/>
                        <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Failed to Generate Card</Box>
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
                            <Box className={classes.generate} onClick={generateNewCard}>RETRY</Box>
                        </Box>
                    </Box>
                }
                {success && 
                <Box sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                }}>
                    <CheckCircleIcon sx={{fontSize:'50px',color:'green'}}/>
                    <Box sx={{color:'green',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Card Generated SuccessFully</Box>
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

export default GeneratingNewCard