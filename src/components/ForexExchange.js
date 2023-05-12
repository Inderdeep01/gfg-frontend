import { Backdrop, Box, Fade, InputLabel, Modal, Switch, TextField, makeStyles, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress, FormControl, FormControlLabel, InputAdornment, MenuItem, Select } from "@mui/material";
import CurrencyFlag from 'react-currency-flags'
import getSymbolFromCurrency from 'currency-symbol-map'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import { URL } from "../ServerURL";
import axios from "axios";
import { GET_ACCOUNT_BALANCE_SUCCESS } from "../store/Constants/AccountBalanceConstant";
import { currencies } from "../utils/gradientAndImages";
import { ADD_ACCOUNT_TRANSACTION } from "../store/Constants/TransactionsConstant";
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
  },
  textfield:{
    '& input':{
      fontSize:(props)=>(props?.amount?.length>5?'30px':'50px'),
    },
    // width:'30%',
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
  }
  },
  textfield2:{
    '& input':{
      fontSize:(props)=>(props?.amountTo?.length>5?'30px':'50px'),
    },
    // width:'30%',
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
  }
  },
  select:{
    padding:'5px',
    border:'0px solid red',
    outline:'0px solid red',
    '& fieldset':{
        border:'none',
    },
    '& .MuiMenuItem-root': {
        fontSize: '30px',
    },
  },
  excIcon:{
    [theme.breakpoints.down("xs")]:{
      top:(props)=>(props.transfer?'27%':'35%')
    }
  }
}));
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#1979e6',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const ForexExchange = ({ open, setOpen,setOtp,setTid,setTxObj,transfer,setTransfer,setExchangePage,account,setAccount}) => {
  const [rate,setRate]=useState({});
  const fetchRates=async()=>{
    try{
      const config={
          headers:{
              "Content-Type":'application/json',
              'Authorization':`Bearer ${userInfo?.token}`
          }
      }
      const {data}=await axios.get(`${URL}/rate`,config);
      setRate(data.rate);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchRates();
  },[])
//   console.log(rate);
  const {userInfo}=useSelector(state=>state.userLogin);
  const [amount,setAmount]=useState('');
  const {balances}=useSelector(state=>state.accountBalance);
  const [currFrom,setCurrFrom]=useState('INR');
  const [amountTo,setAmountTo]=useState('');
  const [currTo,setCurrTo]=useState('USD');
  const classes = useStyle({amount,amountTo,transfer});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState(false);
  const dispatch=useDispatch();
  const [to,setTo]=useState();

  const exchange=async()=>{
    setError("");
    setSuccess(false);
    setLoading(true);
          try{
            const config={
                headers:{
                    "Content-Type":'application/json',
                    'Authorization':`Bearer ${userInfo?.token}`
                }
            }
            const {data}=await axios.post(`${URL}/transact`,{
              type:'forexPurchase',
              sourceToken:currFrom,
              destinationToken:currTo,
              amount:amount,
            },config);
            const currencyFrom=balances?.filter((curr)=>curr?.currency===data?.currency)[0];
            const currencyTo=balances?.filter((curr)=>curr?.currency===data?.settlement)[0];
            const left=balances?.filter((curr)=> curr?.currency!==data?.currency && curr?.currency!==data?.settlement);
            const payload=[
              {
                currency:currencyFrom.currency,
                balance:currencyFrom.balance-JSON.parse(data.amount),
              },
              {
                currency:data?.settlement,
                balance:!currencyTo?.balance?data?.settledAmount:JSON.stringify(JSON.parse(currencyTo.balance)+JSON.parse(data.settledAmount)),
              },
              ...left,
            ]
            dispatch({type:GET_ACCOUNT_BALANCE_SUCCESS,payload:payload});
            dispatch({type:ADD_ACCOUNT_TRANSACTION,payload:data});
            setLoading(false);
            setSuccess(true);
        }
        catch(err)
        {
            var e=err.response && err.response.data.message? err.response.data.message:err.message;
            // console.log(e);
            setLoading(false);
            setError(e);
        }
  }
  const {socket}=useSelector(state=>state.socket);
  const transferCurrency=async()=>{
    setError("");
    setSuccess(false);
    setLoading(true);
    if(!account){
      setError("Reciever Bank Account can't be empty");
      setLoading(false);
      return;
    }
        try{
          const config={
              headers:{
                  "Content-Type":'application/json',
                  'Authorization':`Bearer ${userInfo?.token}`
              }
          }
          const {data}=await axios.post(`${URL}/transact`,{
            type:'forexTransfer',
            sourceToken:currFrom,
            destinationToken:currTo,
            amount:amount,
            recipient:account
          },config);
          setTxObj({
            sourceToken:currFrom,
            destinationToken:currTo,
            amountFrom:amount,
            amountTo:amountTo,
            recipient:account
          })
          setExchangePage(false);
          setOtp(true);
          setTid(data?.id);
          setLoading(false);
      }
      catch(err)
      {
          var e=err.response && err.response.data.message? err.response.data.message:err.message;
          // console.log(e);
          setLoading(false);
          setError(e);
      }
  }



  const handleSubmit=()=>{
    if(transfer){
      transferCurrency();
    }else{
      exchange();
    }
  }

  function formatNumber(num) {
    if (num % 1 !== 0 && num.toString().split('.')[1].length > 4) {
      return num.toFixed(4);
    }
    return num.toString();
  }

  const [err,setErr]=useState('');


  useEffect(()=>{
    if(amount){
      const r=rate[`${currFrom}_${currTo}`];
      let num=JSON.parse(amount)*r;
      setAmountTo(formatNumber(num));
    }
  },[amount])


  
  const VerifyUser=async()=>{
    setErr('');
    const config={
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userInfo?.token}`
      }
    }
    try{
      // setLoading(true);
      const {data}=await axios.post(`${URL}/details`,{accountNo:account},config);
      if(data===null){
        setErr('Invalid Account Number');
        setTo(null);
      }
      else{
        setTo(data);
        setErr('');
        // console.log(data);
      }
      // setLoading(false);
    }catch(error){
      console.log(error);
      // setLoading(false);
    }
  }
  useEffect(()=>{
    if(account){
      VerifyUser();
    }
  },[account])
  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        setSuccess(false);
      },5000)
    }
  },[success])
  return (
            <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',flexDirection:'column',position:'relative'}}>
              <Box sx={{width:'100%',height:'12%',borderBottom:'1px solid lightgrey',alignItems:'center',display:'flex'}}>
                <ArrowBackIosIcon sx={{marginLeft:'20px',fontSize:'30px',cursor:'pointer'}} onClick={()=>setOpen(false)}/>
                <Box sx={{flexGrow:'1',display:'flex',justifyContent:'center',fontSize:'22px',fontWeight:'600',position:'relative',left:'20px'}}>Currency Exchange</Box>
                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                    <FormControlLabel sx={{marginRight:'20px',marginTop:'10px'}}
                    checked={transfer}
                        control={<IOSSwitch sx={{ m: 1 }} onChange={()=>setTransfer(!transfer)}/>}
                        label={<span style={{marginLeft:'10px',fontWeight:'600'}}>Transfer</span>}
                    />
                </Box>
              </Box>
              <Box sx={{width:'80%',borderBottom:'1px solid lightgrey',height:transfer?'20%':'30%',display:'flex',transition:'all 300ms'}}>
                  <Box sx={{width:'50%',height:'100%',justifyContent:'center',display:'flex',flexDirection:'column'}}>
                      <Box sx={{fontSize:'15px',fontWeight:'200'}}>{transfer?'When You Send':'Currency From'}</Box>
                      <Box style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <Box sx={{fontSize:'30px',fontWeight:'600'}}>{getSymbolFromCurrency(currFrom)}</Box>
                      <TextField
                        id="outlined"
                        type='number'
                        className={classes.textfield}
                        placeholder="0"
                        value={amount}
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        onChange={(e)=>{
                          if((e.target.value)<=10000000 && (e.target.value)>'0'){
                            setAmount(e.target.value);
                          }
                          else if(e.target.value?.length===0){
                            setAmount('');
                            setAmountTo('');
                          }
                        }}
                        InputProps={{style: {width: `${amount?.length===0?'30':amount?.length*30}px`},disableUnderline: true}}
                        />
                      </Box>
                  </Box>
                  <Box sx={{width:'50%',height:'100%',display:'flex'}}>
                    <Box sx={{width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'center',display:'flex'}}>
                    <Box sx={{width:'50px',height:'50px'}}>
                        <CurrencyFlag currency={currFrom} style={{
                          borderRadius:'100px',
                          width:'50px',
                          height:'50px',
                          backgroundPosition:'center'
                        }}/>
                      </Box>
                        <Box>
                        <FormControl sx={{ m: 1, width:'90px' }}>
                              <Select
                              className={classes.select}
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={currFrom}
                                onChange={(e)=> {if(e.target.value!==currTo){
                                  setCurrFrom(e.target.value);
                                }}}
                              >
                                {balances?.map((curr)=>{
                                  return <MenuItem value={curr?.currency}>{curr?.currency}</MenuItem>
                                })}
                                
                              </Select>
                          </FormControl>
                        </Box>
                    </Box>
                  </Box>
              </Box>
              <Box sx={{position:'absolute',top:transfer?'23.5%':'33.5%',width:'fit-content',background:'white',borderRadius:'50%',border:'1px solid lightgrey',width:'60px',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',transition:'all 300ms'}} className={classes.excIcon} onClick={()=>{
                var temp=currFrom;
                setCurrFrom(currTo);
                setCurrTo(temp);
              }}><ImportExportIcon sx={{fontSize:'50px',position:'relative'}}/></Box>
              <Box sx={{width:'80%',borderBottom:'1px solid lightgrey',height:transfer?'20%':'30%',display:'flex',transition:'all 300ms'}}>
                  <Box sx={{width:'50%',height:'100%',justifyContent:'center',display:'flex',flexDirection:'column'}}>
                      <Box sx={{fontSize:'15px',fontWeight:'200'}}>{transfer?'They Will Receive':'Currency To'}</Box>
                      <Box style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <Box sx={{fontSize:'30px',fontWeight:'600'}}>{getSymbolFromCurrency(currTo)}</Box>
                      <TextField
                        id="outlined"
                        type='number'
                        placeholder="0"
                        disabled
                        value={amountTo}
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        // onChange={(e)=>{
                        //   if((e.target.value)<=10000000 && (e.target.value)>0){
                        //     setAmountTo(e.target.value);
                        //   }
                        //   else if(e.target.value?.length===0){
                        //     setAmountTo('');
                        //   }
                        // }}
                        InputProps={{style: {width: `${amountTo?.length===0?'30':amountTo?.length*30}px`},disableUnderline: true}}
                        className={classes.textfield2}
                        />
                      </Box>
                  </Box>
                  <Box sx={{width:'50%',height:'100%',display:'flex'}}>
                    <Box sx={{width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'center',display:'flex'}}>
                    <Box sx={{width:'50px',height:'50px'}}>
                        <CurrencyFlag currency={currTo} style={{
                          borderRadius:'100px',
                          width:'50px',
                          height:'50px',
                          backgroundPosition:'center'
                        }}/>
                      </Box>
                        <Box>
                        <FormControl sx={{ m: 1, width:'90px' }}>
                              <Select
                              className={classes.select}
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={currTo}
                                onChange={(e)=> {if(e.target.value!==currFrom){setCurrTo(e.target.value)}}}
                              >
                                {currencies?.map((curr)=>{
                                  return <MenuItem value={curr}>{curr}</MenuItem>
                                })}
                                
                              </Select>
                          </FormControl>
                        </Box>
                    </Box>
                  </Box>
              </Box>
              <Box sx={{fontSize:'20px',paddingTop:'10px'}}>
                Exchange Rate - 1 {getSymbolFromCurrency(currFrom)} = {rate[`${currFrom}_${currTo}`]} {getSymbolFromCurrency(currTo)}
              </Box>
              {transfer && <Box sx={{width:'80%',display:'flex',marginTop:'35px'}}>
              <TextField
                    id="input-with-icon-textfield"
                    label="Enter Bank Account"
                    value={account}
                    onChange={(e)=>{setAccount(e.target.value)}}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyboardAltOutlinedIcon color='primary'/>
                        </InputAdornment>
                    ),
                    }}
                    helperText={err?<span style={{color:'red'}}>{err}</span>:<span style={{color:'#1979e6'}}>{to?.firstName}{to?.lastName?to?.lastName:''}</span>}
                    style={{
                        width:'100%',
                    }}
                    variant="outlined"
                />
                </Box>}
              <Box sx={{width:'80%',height:'25%',justifyContent:'center',display:'flex',margin:'15px',flexDirection:'column'}}>
                <Box sx={{
                  width:'100%',
                  height:'50px',
                  background:loading || !amount?'lightgrey':'#1979e6',
                  color:'white',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  fontSize:'20px',
                  borderRadius:'20px',
                  cursor:'pointer',
                }} onClick={()=>{
                  if(!loading && amount && amountTo){
                    handleSubmit();
                  }
                }}>
                  {transfer?'Proceed':'Exchange'}
                   {loading && <CircularProgress sx={{color:'#1979e6',marginLeft:'20px'}} size={30} />}
                  </Box>
                  <Box sx={{display:'flex',justifyContent:'center',marginTop:'10px'}}>{error?<span style={{color:'red'}}>{error}</span>:success?(transfer?<span style={{color:'green',fontWeight:'700'}}>Forex Transfer SuccessFul</span>:<span style={{color:'green',fontWeight:'700'}}>Currency Exchanged SuccessFully</span>):''}</Box>
              </Box>
            </Box>
  );
};

export default ForexExchange;
