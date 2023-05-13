import { makeStyles } from '@material-ui/core';
import { Box, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { URL } from '../../ServerURL';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCOUNT_BALANCE_SUCCESS } from '../../store/Constants/AccountBalanceConstant';
import { ADD_ACCOUNT_TRANSACTION, SET_ACCOUNT_TRANSACTIONS } from '../../store/Constants/TransactionsConstant';
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
      },
      otp__digit:{
        height: 40,
        width: 20,
        backgroundColor: 'transparent',
        borderRadius: 4,
        border: `1px solid lightgrey`,
        textAlign: 'center',
        outline: 'none',
        fontSize: 16,
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
        },
        /* Firefox */
        '&[type=number]': {
        '-moz-appearance': 'textfield',
        },
        '&:focus': {
        borderWidth: 2,
        borderColor: 'black',
        fontSize: 20,
        },
      },
      inputDiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'20px',
        width:'100%',
        height:'25%',
        [theme.breakpoints.down("xs")]:{
            gap:'15px',
        }
      }

}))
const PIN = ({token,amount,account,setLoading,setError,setSuccess,setAmountPage,setPinPage,card,setOpen,transactionId}) => {
    const classes=useStyle();
    const [visible,setVisible]=useState(false);

    const {userInfo}=useSelector(state=>state.userLogin);
    const {balances}=useSelector(state=>state.accountBalance);
    const {transactions}=useSelector(state=>state.accountTransactions)
    const dispatch=useDispatch();
    const {socket}=useSelector(state=>state.socket);
    const handleSubmit = async () => {
        setPinPage(false);
        setError('');
        setSuccess(false);
        setLoading(true);
        var otp_inputs=document.querySelectorAll(".otp_digit");
        var otp="";
        otp_inputs.forEach((ele)=>{
            otp+=ele.value;
        })
        try{
                const config={
                    headers:{
                        "Content-Type":'application/json',
                        'Authorization':`Bearer ${userInfo?.token}`
                    }
                }
                const {data}=await axios.post(`${URL}/verifyTx`,{
                    id:transactionId,
                    otp:otp
                },config);

                await socket.emit("transaction",data);

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
                dispatch({
                    type:ADD_ACCOUNT_TRANSACTION,
                    payload:data
                })

                setLoading(false);
                setSuccess(true);
            }
            catch(err)
            {
                var e=err.response && err.response.data.message? err.response.data.message:err.message;
                console.log(e);
                setLoading(false);
                setError(e);
            }
      };
      useEffect(()=>{
        // ref1.current.focus();
      },[])
      useEffect(()=>{
        var otp_inputs=document.querySelectorAll(".otp_digit")
        // console.log(otp_inputs);
        otp_inputs.forEach((_)=>{
        _.addEventListener("keyup", handle_next_input)
        })
        function handle_next_input(event){
            var mykey = "0123456789".split("")
            let current = event.target
            let index = parseInt(current.classList[2].split("__")[2])
            current.value = event.key
            if(event.keyCode == 8 && index > 1){
                current.previousElementSibling.focus()
            }
            if(index < 6 && mykey.indexOf(""+event.key+"") != -1){
                var next = current.nextElementSibling;
                next.focus()
            }
            var _finalKey = ""
            for(let {value} of otp_inputs){
                _finalKey += value
            }
        }
      },[])
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
        }}>Enter OTP</Box>
        <Box>OTP has been sent to {userInfo?.email}</Box>
        <Box className={classes.inputDiv}>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__1`}/>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__2`}/>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__3`}/>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__4`}/>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__5`}/>
            <input type='number' className={`${classes.otp__digit} otp_digit otp__field__6`}/>
        </Box>
        <Box className={classes.generate} onClick={handleSubmit} sx={{
            position:'absolute',
            bottom:'50px'
        }}>PAY</Box>
    </Box>
  )
}

export default PIN