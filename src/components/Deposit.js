import { Backdrop, CircularProgress, Fade, Modal, TextField, makeStyles } from "@material-ui/core";
import { Box, Select, } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import { URL } from "../ServerURL";
import { useDispatch, useSelector } from "react-redux";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GET_ACCOUNT_BALANCE_SUCCESS } from "../store/Constants/AccountBalanceConstant";
import { NetworkImage } from "../utils/gradientAndImages";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SET_ACCOUNT_TRANSACTIONS } from "../store/Constants/TransactionsConstant";
import { inWords } from "./TransactionReciept";
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
    height: "600px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
    },
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
    width:'80%',
    height:'40px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'10px',
    background:'#1979e6',
    border:'1px solid #1979e6',
    color:'white',
    cursor:'pointer',
    '&:hover':{
        background:'#1979e6',
        color:'white',
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
  textfield:{
    // width:'30%',
    '& input':{
        fontSize:'50px',
    },
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
  image:{
    width:'70px',
    height:'70px'
  },
  back:{
    width:'fit-content',
    cursor:'pointer',
    padding:'5px',
    position:'absolute',
    left:'15px',
    top:'20px',
    color:'rgb(25, 121, 230)',
},
}));
const Deposit = ({ open, setOpen}) => {
  useEffect(()=>{
    if(open===false){
      setAmount('');
      setError(false);
      setLoading(false);
      setSuccess(false);
    }
  },[open])
  const handleClose = () => {
    setOpen(false);
  };
  const [token, setToken] = React.useState('INR');
  const [amount,setAmount]=useState('');
  const handleChange = (event) => {
    setToken(event.target.value);
  };
  const {userInfo}=useSelector(state=>state.userLogin);
  const[error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  
  const dispatch=useDispatch();
  const {balances}=useSelector(state=>state.accountBalance);
  const {transactions}=useSelector(state=>state.accountTransactions);

  const handleSubmit=async()=>{
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
                const {data}=await axios.post(`${URL}/deposit`,{
                    token:token,
                    amount:amount
                },config);
                const current=balances?.filter((curr)=>curr.currency===token)[0];
                const left=balances?.filter((curr)=>curr.currency!==token);
                const payload=[
                  {
                    currency:token,
                    balance:((current?.balance)?JSON.parse(current?.balance):0)+JSON.parse(amount)
                  },
                  ...left,
                ]
                dispatch({
                  type:GET_ACCOUNT_BALANCE_SUCCESS,
                  payload:payload
                })
                setLoading(false);
                setSuccess(true);
                // console.log(data);
                dispatch({
                  type:SET_ACCOUNT_TRANSACTIONS,
                  payload:[
                    data
                    ,...transactions
                  ]
                })
                // setTimeout(()=>{
                //   setOpen(false);
                // },5000)
            }
            catch(err)
            {
                var e=err.response && err.response.data.message? err.response.data.message:err.message;
                setLoading(false);
                setError(e);
            }
  }
  const classes = useStyle();

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
                marginBottom: "40px",
                position: "relative",
              }}
            >
                {!loading && !error && !success &&
                <Box sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    gap:'20px',
                    position:'relative',
                }}>
                  <Box className={classes.back} onClick={()=>{setOpen(false)}}><ArrowBackIosNewIcon sx={{fontSize:'30px'}}/></Box>
                  <Box sx={{
                    // border:'1px solid red',
                    position:'absolute',
                    top:'20px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column'
                  }}>
                    <img src={NetworkImage['IPBS']} className={classes.image}/>
                    <Box sx={{fontSize:'20px',fontWeight:'bold'}}> {userInfo?.firstName} {userInfo?.lastName}</Box>
                    <Box sx={{fontSize:'15px',fontWeight:'400',fontFamily:'monospace'}}>Inter Planetary Bank  XX {userInfo?.accountNo.substr(userInfo?.accountNo?.length-4,userInfo?.accountNo?.length)}</Box>
                  </Box>
              <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'20px',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column'
                }}>
                  <Box>You are Adding Money</Box>
                  <Box sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    // border:'1px solid red',
                    transform:'translate(-30px)'
                  }}>
                  <FormControl sx={{
                    width:'80px'
                  }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      value={token}
                      onChange={handleChange}
                      className={classes.select}
                      style={{
                        fontSize:'35px',
                        transform:'translateY(-10px)'
                      }}
                    >
                      <MenuItem value={'INR'} sx={{textAlign:'center',fontSize:'30px'}}>₹</MenuItem>
                      <MenuItem value={'USD'} sx={{textAlign:'center',fontSize:'30px'}}>$</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                        id="outlined"
                        type='number'
                        placeholder="0"
                        focused
                        value={amount}
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        onChange={(e)=>{
                          if((e.target.value)<=10000000 && (e.target.value)>0){
                            setAmount(e.target.value);
                          }
                          else if(e.target.value?.length===0){
                            setAmount('');
                          }
                        }}
                        InputProps={{style: {width: `${amount?.length===0?'30':amount?.length*30}px`},disableUnderline: true }}
                        className={classes.textfield}
                        />
                </Box>
                <Box sx={{transform:'translateY(-20px)',color:'grey',visibility:amount?'visible':'hidden'}}>{amount && inWords(amount,token)}</Box>
                </Box>

              </Box>
              <Box sx={{
                            width:'100%',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            gap:'50px',
                            position:'absolute',
                            bottom:'10px',
                        }}>
                            {/* <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box> */}
                            <Box className={classes.generate} onClick={handleSubmit}>DEPOSIT</Box>
              </Box>
              </Box>
              }

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
                    <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Depositing money in your Account...</Box>
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
                            <Box className={classes.generate} sx={{ width:'115px',borderRadius:'20px' }} onClick={handleSubmit}>RETRY</Box>
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
                    <Box sx={{color:'green',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Money Deposited SuccessFully</Box>
                    {/* <Box sx={{color:'red'}}>{error}</Box> */}
                    <Box sx={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:'50px',
                        position:'absolute',
                        bottom:'10px'
                    }}>
                      <Box className={classes.generate} onClick={()=>{setOpen(false)}}>CLOSE</Box>
                    </Box>
                </Box>
                }


            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Deposit;
