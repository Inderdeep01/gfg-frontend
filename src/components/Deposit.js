import { Backdrop, CircularProgress, Fade, Modal, TextField, makeStyles } from "@material-ui/core";
import { Box, } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { URL } from "../ServerURL";
import { useDispatch, useSelector } from "react-redux";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GET_ACCOUNT_BALANCE_SUCCESS } from "../store/Constants/AccountBalanceConstant";
import { NetworkImage } from "../utils/gradientAndImages";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
    height: "500px",
    display: "flex",
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
const Deposit = ({ open, setOpen ,setTransactions,transactions}) => {
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
                console.log(data);
                setTransactions([
                  data
                  ,...transactions
                ])
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

  var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
var b = ['', '', 'twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

function inWords (n) {
  if (n < 0)
  return false;
var single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
var double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
var below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
if (n === 0) return 'Zero'
function translate(n) {
var word = ""
if (n < 10) {
  word = single_digit[n] + ' '
}
else if (n < 20) {
  word = double_digit[n - 10] + ' '
}
else if (n < 100) {
  var rem = translate(n % 10)
  word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
}
else if (n < 1000) {
  word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
}
else if (n < 100000) {
  word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
}
else if (n < 10000000) {
  word = translate(parseInt(n / 100000)).trim() + ' Lakh ' + translate(n % 100000)
}
else {
  word = translate(parseInt(n / 10000000)).trim() + ' Crore ' + translate(n % 10000000)
}
return word
}
var result = translate(n) 
return result.trim()+' Only'
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
                  }}>
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
                <Box sx={{transform:'translateY(-20px)',color:'grey',visibility:amount?'visible':'hidden'}}>{token==='INR'?'Rupees':'USD'} {inWords(amount)}</Box>
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
