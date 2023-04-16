import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadingIcon from '@mui/icons-material/Downloading';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
import Deposit from './Deposit';
import axios from 'axios';
import { URL } from '../ServerURL';
const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        position:'relative',
        background:'transparent'
        // background:'url(https://img.freepik.com/premium-vector/light-neumorphism-circle-background-three-dimensional-neumorphic-texture-wallpaper-neumorphism-vector-background-neumorphic-ui-ux-interface-design-vector-graphic-eps-10_564974-55.jpg?w=2000)',
    },
    btn:{
        position:'absolute',
        right:'10px',
        top:'10px',
        cursor:'pointer',
        display:'none',
        [theme.breakpoints.down("sm")]:{
            display:'flex',
        },
        width:'fit-content',
        height:'40px',
        fontSize:'18px',
        alignItems:'center',
        fontWeight:'500',
        paddingLeft:'10px',
        paddingRight:'10px',
        justifyContent:'center',
        borderRadius:'20px',
        color:'#1979e6',
        border:'1px solid #1979e6',
        background:'transparent',
        cursor:'pointer',
        '&:hover':{
            color:'white',
            background:'#1979e6'
        }
    },
    center:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        background:'transparent',
        gap:'50px'
    },
    balance:{
        width:'150px',
        cursor:'pointer',
        height:'150px',
        borderRadius:'20px',
        padding:'20px',
        background:'white',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        transition:`all 0.2s ${theme.transitions.easing.easeInOut}`,
        '&:hover':{
            transform:'translateY(-10px)',
        }
    },
    rupees:{
        background:'rgb(25, 121, 230,0.2)',
        width:'fit-content',
        padding:'7px',
        borderRadius:'5px',
        color:'rgb(25, 121, 230)'
    },
    usd:{
        background:'rgb(255, 236, 235)',
        width:'fit-content',
        padding:'7px',
        borderRadius:'5px',
        color:'rgb(253, 68, 56)'
    },
    pay:{
        width:'300px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'80px',
        // border:'1px solid red',
        gap:'100px'
    },
    item:{
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'rgb(72, 7, 234)',
        width:'50px',
        height:'50px',
        borderRadius:'50%',
        cursor:'pointer'
    },
    wrap:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    detail:{
        background:'white',
        padding:'10px',
        paddingLeft:'20px',
        paddingRight:'20px',
        borderRadius:'10px',
        position:'relative',
    }
}))
const Balance = ({setTransact}) => {
    const [copy,setCopy]=useState(false);
    const classes=useStyle();
    const {userInfo}=useSelector(state=>state.userLogin)
    const copyhandler=()=>{
        setCopy(true);
        navigator.clipboard.writeText(userInfo?.accountNo);
        setTimeout(()=>{
            setCopy(false)
        },5000)
    }
    const [balances,setBalances]=useState([]);
    const fetchBalance=async()=>{
        try
            {
                const config={
                    headers:{
                        "Content-Type":'application/json',
                        'Authorization':`Bearer ${userInfo.token}`
                    }
                }
                const {data}=await axios.get(`${URL}/balance`,config);
                setBalances(data);
            }
            catch(err)
            {
                var e=err.response && err.response.data.message? err.response.data.message:err.message;
                console.log(e);
            }
    }
    useEffect(()=>{
        fetchBalance();
    },[])
    const [open,setOpen]=useState(false);
  return (
    <Box className={classes.outer}>
        <Box className={classes.btn} onClick={()=>setTransact(true)}>View Transactions</Box>
        <Box className={classes.center}>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                gap:'20px'
            }}>
                <Box sx={{fontSize:'30px',fontWeight:'800'}}>IPBS Account</Box>
                <Box className={classes.detail}>Account Holder : {userInfo?.firstName} {userInfo?.lastName}</Box>
                <Box className={classes.detail}>Email : {userInfo?.email}</Box>
                <Box className={classes.detail} sx={{display:'flex',placeContent:'center',gap:'10px'}}>Account Number : {userInfo?.accountNo?.substr(0,5)}******{userInfo?.accountNo?.substr(userInfo?.accountNo?.length-5,userInfo?.accountNo?.length)}  {copy===false?<ContentCopyIcon onClick={copyhandler} sx={{width:'20px',cursor:'pointer'}}/>:<DoneIcon sx={{color:'green'}}/>}</Box>
                <Box className={classes.pay}>
                    <Box className={classes.wrap} onClick={()=>setOpen(true)}>
                        <Box  className={classes.item}><DownloadingIcon/></Box>
                        <Box>Deposit</Box>
                    </Box>
                    <Box className={classes.wrap}>
                        <Box className={classes.item}><CurrencyExchangeIcon/></Box>
                        <Box>Pay</Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display:'flex',
                gap:'30px'
            }}>
                {balances?.map((curr)=>{
                    return (
                        <Box className={classes.balance} sx={{
                            color:'rgb(25, 121, 230)',
                        }}>
                            <Box className={`${curr?.currency==='INR'?classes.rupees:classes.usd}`}>{curr?.currency==='INR'?<CurrencyRupeeIcon/>:<CurrencyExchangeIcon/>}</Box>
                            <Box sx={{marginTop:'10px',fontSize:'20px',color:'black'}}>{curr?.currency}</Box>
                            <Box sx={{
                                // color:'rgb(25, 121, 230)',
                            }}>{curr?.currency==='INR'?<CurrencyRupeeIcon/>:<CurrencyExchangeIcon/>}
                             <span style={{
                                fontSize:'30px',
                                fontWeight:'bold'
                            }}>{curr?.balance}</span></Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
        <Deposit open={open} setOpen={setOpen}/>
    </Box>
  )
}

export default Balance