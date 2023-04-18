import { makeStyles } from '@material-ui/core';
import { Box, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { URL } from '../../ServerURL';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCOUNT_BALANCE_SUCCESS } from '../../store/Constants/AccountBalanceConstant';

const useStyle=makeStyles((theme)=>({
    textfield:{
        '& fieldset':{
            outline:'none',
            border:'0px solid red',
        }
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
      generate:{
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
const PIN = ({token,amount,account,setLoading,setError,setSuccess,setAmountPage,setPinPage,card,setOpen}) => {
    const classes=useStyle();
    const [visible,setVisible]=useState(false);
    const ref1=useRef();
    const ref2=useRef();
    const ref3=useRef();
    const ref4=useRef();
    const [p1,setP1]=useState('');
    const [p2,setP2]=useState('');
    const [p3,setP3]=useState('');
    const [p4,setP4]=useState('');

    const {userInfo}=useSelector(state=>state.userLogin);
    const {balances}=useSelector(state=>state.accountBalance);
    const dispatch=useDispatch();
    const handleSubmit = async () => {
        setPinPage(false);
        setError('');
        setSuccess(false);
        setLoading(true);
        const pin=p1+p2+p3+p4;
        try
            {
                const config={
                    headers:{
                        "Content-Type":'application/json',
                        'Authorization':`Bearer ${userInfo.token}`
                    }
                }
                const {data}=await axios.post(`${URL}/transact`,{
                    type:'card',
                    amount:amount,
                    pin:pin,
                    destinationToken:token,
                    recipient:account,
                    cardNumber:card?.cardNumber
                },config);
                const current=balances?.filter((curr)=>curr.currency===token)[0];
                const left=balances?.filter((curr)=>curr.currency!==token);
                const payload=[
                  {
                    currency:token,
                    balance:current.balance-JSON.parse(amount),
                  },
                  ...left,
                ]
                dispatch({
                  type:GET_ACCOUNT_BALANCE_SUCCESS,
                  payload:payload
                })
                setLoading(false);
                setSuccess(true);
                setTimeout(()=>{
                    setOpen(false);
                },6000)
            }
            catch(err)
            {
                var e=err.response && err.response.data.message? err.response.data.message:err.message;
                setLoading(false);
                setError(e);
            }
      };

  return (
    <Box sx={{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
    }}>
        <Box
        className={classes.back}
        onClick={() => {
            setPinPage(false);
          setAmountPage(true);
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "30px" }} />
      </Box>
        <Box sx={{
            width:'100%',
            height:'fit-content',
            marginTop:'50px',
            // border:'1px solid red',
            fontSize:'20px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>Sending {token==='INR'?'₹':'$'} {amount}  to XX{account?.substr(account?.length-4,account?.length)}</Box>
        <Box sx={{
            fontSize:'30px',
            fontWeight:'bold',
            marginTop:'30px'
        }}>Enter PIN</Box>

        <Box sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:'30px',
            width:'100%',
            height:'50%',
        }}>
            <TextField inputRef={ref1} type={visible?'text':'password'} variant='outlined' value={p1} sx={{width:'50px'}} InputProps={{style:{fontSize:'20px',paddingLeft:'5px'}}} onChange={(e)=>{
                setP1('');
                setP1(e.target.value);
                if(e.target.value!=''){
                    ref2.current.focus();
                }
            }}/>
            <TextField inputRef={ref2} type={visible?'text':'password'} variant='outlined' value={p2} sx={{width:'50px'}} InputProps={{style:{fontSize:'20px',paddingLeft:'5px'}}} onChange={(e)=>{
                setP2('');
                setP2(e.target.value);
                if(e.target.value!=''){
                    ref3.current.focus();
                }
            }}/>
            <TextField inputRef={ref3} type={visible?'text':'password'} variant='outlined' value={p3} sx={{width:'50px'}} InputProps={{style:{fontSize:'20px',paddingLeft:'5px'}}} onChange={(e)=>{
                setP3('');
                setP3(e.target.value);
                if(e.target.value!=''){
                    ref4.current.focus();
                }
            }}/>
            <TextField inputRef={ref4} type={visible?'text':'password'} variant='outlined' value={p4} sx={{width:'50px'}} InputProps={{style:{fontSize:'20px',paddingLeft:'5px'}}} onChange={(e)=>{
                setP4('');
                setP4(e.target.value);
            }}/>
        </Box>

        <Box sx={{color:'#2781e8',display:'flex',alignItems:'center',gap:'10px',fontSize:'20px',fontWeight:'500',position:'relative',top:'-80px',cursor:'pointer'}} onClick={()=>{setVisible(!visible)}}>{visible?<VisibilityOff/>:<Visibility/>}{visible?'HIDE':'SHOW'}</Box>
        <Box className={classes.generate} onClick={handleSubmit}>PAY</Box>
    </Box>
  )
}

export default PIN