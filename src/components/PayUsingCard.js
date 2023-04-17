import { Backdrop, CircularProgress, Fade, Modal, makeStyles } from "@material-ui/core";
import { Box ,FilledInput,IconButton,InputAdornment,InputLabel,TextField} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { URL } from "../ServerURL";
import { useDispatch, useSelector } from "react-redux";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GET_ACCOUNT_BALANCE_SUCCESS } from "../store/Constants/AccountBalanceConstant";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    width:'30%',
    '& input':{
        fontSize:'50px',
        // border:'0px solid red'
    },
    "& .MuiFilledInput-root": {
      border:'0px solid red',
      outline:'0px solid red'
    },
    '& fieldset':{
      outline:'0px solid red'
    }
  }
}));
const PayUsingCard = ({ open, setOpen,cardNumber }) => {
  useEffect(()=>{
    if(open===false){
      setSuccess(false);
      setLoading(false);
      setError(false);
    }
  },[open])
  const handleClose = () => {
    setOpen(false);
  };
  const [token, setToken] = React.useState('INR');
  const [amount,setAmount]=useState();
  const handleChange = (event) => {
    setToken(event.target.value);
  };
  const {userInfo}=useSelector(state=>state.userLogin);
  const[error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [pin,setPin]=useState('');

  const {balances}=useSelector(state=>state.accountBalance);
  const dispatch=useDispatch();
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
                const {data}=await axios.post(`${URL}/transact`,{
                    type:'card',
                    amount:amount,
                    pin:pin,
                    destinationToken:token,
                    recipient:account,
                    cardNumber:cardNumber
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
  }
  const classes = useStyle();
  const [account,setAccount]=useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
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
                    position:'relative'
                }}>
              <h1
                style={{
                  fontSize: "30px",
                  color: "black",
                  position: "absolute",
                  top: "30px",
                }}
              >
                PAYMENT
              </h1>
              <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'20px',
                    justifyContent:'center',
                    alignItems:'center'
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
                        fontSize:'30px'
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
                        variant="standard"
                        focused
                        value={amount}
                        InputProps={{ disableUnderline: true,inputProps: { min: 0}}}
                        onChange={(e)=>setAmount(e.target.value)}
                        sx={{
                            width:'200px',
                        }}
                        className={classes.textfield}
                        />
                </Box>
                <Box sx={{
                  width:'100%',
                  display:'flex',
                  justifyContent:'center',
                  flexDirection:'column',
                  alignItems:'center',
                  gap:'10px'
                }}>
                <TextField
                label="Account Number"
                variant="filled"
                value={account}
                onChange={(e)=>setAccount(e.target.value)}
                sx={{
                  width:'240px',
                  marginTop:'10px',
                  marginBottom:'10px'
                }}
                        // focused
                        // onChange={(e)=>setAmount(e.target.value)}
                        // className={classes.textfield
                      />
                            <FormControl variant="filled" className={classes.input}>
                            <InputLabel htmlFor="filled-adornment-password" color='success'>PIN</InputLabel>
                            <FilledInput
                            id="filled-adornment-password"
                            value={pin}
                            onChange={(e)=>{setPin(e.target.value)}}
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
                </Box>
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
                          <Box className={classes.generate} onClick={handleSubmit}>PAY</Box>
                </Box>
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
                    <Box sx={{color:'rgb(25, 120, 228)',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Processing Your Payment...</Box>
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
                        <Box sx={{color:'red',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Payment Failed</Box>
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
                            <Box className={classes.generate} onClick={()=>{
                              setError('');
                              setLoading('');
                            }}>RETRY</Box>
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
                    <Box sx={{color:'green',fontWeight:'bold',fontSize:'20px',marginTop:'30px'}}>Payment Successfull</Box>
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
  );
};

export default PayUsingCard;
