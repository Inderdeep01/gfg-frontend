import {
  Backdrop,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { URL } from "../../ServerURL";
import { useDispatch, useSelector } from "react-redux";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GET_ACCOUNT_BALANCE_SUCCESS } from "../../store/Constants/AccountBalanceConstant";
import { NetworkImage } from "../../utils/gradientAndImages";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { inWords } from "../TransactionReciept";
import getSymbolFromCurrency from "currency-symbol-map";
const useStyle = makeStyles((theme) => ({
  cancel: {
    width: "115px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    // background:'#0050ff',
    border: "1px solid #1979e6",
    color: "#1979e6",
    cursor: "pointer",
    "&:hover": {
      background: "#1979e6",
      color: "white",
    },
  },
  generate: {
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
  select: {
    padding: "5px",
    border: "0px solid red",
    outline: "0px solid red",
    "& fieldset": {
      border: "none",
    },
    "& .MuiMenuItem-root": {
      fontSize: "30px",
    },
  },
  textfield: {
    // width:'30%',
    "& input": {
      fontSize: "50px",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  image: {
    width: "70px",
    height: "70px",
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
}));
const PayUsingCard = ({amount,setAmount,account,setAmountPage,setPINPage,setRecipientPage,token,setToken,to,setTo,fromQr,setOpen,fetch,setTransactionId}) => {
  const handleChange = (event) => {
    setToken(event.target.value);
  };
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const { balances } = useSelector((state) => state.accountBalance);
  const classes = useStyle();
const [loading,setLoading]=useState(false);
const navigate=useNavigate();
  const handleSubmit=async()=>{
    setLoading(true);
    setTransactionId('');
    try{
      const config={
        headers:{
            "Content-Type":'application/json',
            'Authorization':`Bearer ${userInfo.token}`
        }
    }
      const {data}=await axios.post(`${URL}/transact`,{
          type:'simpleTransfer',
          amount:amount,
          destinationToken:token,
          recipient:account,
      },config);
      //id,
      setTransactionId(data.id);
      setLoading(false);
      setAmountPage(false);
      setPINPage(true);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }
  const [noFunds, setnoFunds] = useState(false);
  useEffect(()=>{
    if(amount){
      const res=balances.filter(ele=>ele.currency===token)[0];
      if(JSON.parse(amount)>JSON.parse(res.balance)){
        setnoFunds(true);
      }
      else{
        setnoFunds(false);
      }
    }
  },[amount,token])
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
      }}
    >
      <Box
        className={classes.back}
        onClick={() => {
          if(fromQr){
            setOpen(false);
            navigate('/');
          }else{
            setPINPage(false);
            setRecipientPage(true);
          }
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "30px" }} />
      </Box>
      <Box
        sx={{
          // border:'1px solid red',
          position: "absolute",
          top: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={NetworkImage["IPBS"]} className={classes.image} />
        {/* <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
          {" "}
          {userInfo?.firstName} {userInfo?.lastName}
        </Box> */}
        <Box
          sx={{ fontSize: "15px", fontWeight: "400", fontFamily: "monospace" }}
        >
          Inter Planetary Bank XX{" "}
          {account?.substr(
            account?.length - 4,
            account?.length
          )}
        </Box>
        <Box sx={{fontSize:'20px',fontWeight:'500'}}>{to?.firstName} {to?.lastName?to?.lastName:''}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>You are Paying</Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              // border:'1px solid red',
              transform: "translate(-30px)",
            }}
          >
            <FormControl
              sx={{
                width: "80px",
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                value={token}
                onChange={handleChange}
                className={classes.select}
                style={{
                  fontSize: "35px",
                  transform: "translateY(-10px)",
                }}
              >
                {balances?.map((curr)=>{
                  return (
                    <MenuItem
                      value={curr?.currency}
                      sx={{ textAlign: "center", fontSize: "30px" }}
                    >
                      {getSymbolFromCurrency(curr?.currency)}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined"
              type="number"
              placeholder="0"
              focused
              value={amount}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              onChange={(e) => {
                if((e.target.value)<=10000000 && (e.target.value)>0){
                  setAmount(e.target.value);
                }
                else if(e.target.value?.length===0){
                  setAmount('');
                }
              }}
              InputProps={{
                inputProps: {
                  type: 'number',
                  min: 0, max: 25,
                },
                style: {
                  width: `${
                    amount?.length === 0 ? "30" : amount?.length * 30
                  }px`,
                },
                disableUnderline: true,
              }}
              className={classes.textfield}
            />
          </Box>
          <Box
            sx={{
              transform: "translateY(-20px)",
              color: "grey",
              visibility: amount ? "visible" : "hidden",
            }}
          >
            {amount && inWords(amount,token)}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "98%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          position: "absolute",
          border:'1px solid lightgrey',
          bottom:'0px',
          borderTopLeftRadius:'10px',
          borderTopRightRadius:'10px'
        }}
      >
        <Box sx={{
          width:'100%',
          height:'150px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }}>
          <Box sx={{
            width:'100%',
            height:'fit-content',
            display:'flex',
            marginBottom:'10px'
          }}>
            <Box sx={{
              width:'10%',
              // border:'1px solid red',
              marginLeft:'50px',
            }}>
              <img src={NetworkImage['IPBS']} height={50} width={50} style={{objectFit:'contain'}}/>
            </Box>
            <Box sx={{
              width:'80%',
              display:'flex',
              flexDirection:'column',
              marginLeft:'10px'
            }}>
              <Box>Pay</Box>
              <Box sx={{fontSize:'18px',fontWeight:'600'}}>Account XX {userInfo.accountNo?.substr(userInfo.accountNo?.length-4,userInfo.accountNo?.length)}</Box>
            </Box>
          </Box>
          <Box className={classes.generate}
          sx={{
            background:fetch?'#1979e6':noFunds?'lightgrey':amount?'#1979e6':'lightgrey',
            cursor:amount?'pointer':'not-allowed'
          }}
          onClick={()=>{
            if(amount && to!==null && !noFunds){
              handleSubmit();
            }
          }}>
            {loading || fetch?
            <Loading/>:
            to===null?<span style={{color:'red'}}>Invalid User</span>:noFunds?<span style={{color:'red'}}>Insufficent Funds</span>:'PAY'}
            </Box>
        </Box>
        {/* <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box> */}
      </Box>
    </Box>
  );
};

export default PayUsingCard;
