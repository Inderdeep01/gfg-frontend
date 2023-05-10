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

  var a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

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
                <MenuItem
                  value={"INR"}
                  sx={{ textAlign: "center", fontSize: "30px" }}
                >
                  ₹
                </MenuItem>
                <MenuItem
                  value={"USD"}
                  sx={{ textAlign: "center", fontSize: "30px" }}
                >
                  $
                </MenuItem>
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
            {token === "INR" ? "Rupees" : "USD"} {inWords(amount)}
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
            background:fetch?'#1979e6':amount?'#1979e6':'lightgrey',
            cursor:amount?'pointer':'not-allowed'
          }}
          onClick={()=>{
            if(amount && to!==null){
              handleSubmit();
            }
          }}>
            {loading || fetch?
            <Loading/>:
            to===null?<span style={{color:'red'}}>Invalid User</span>:'PAY'}
            </Box>
        </Box>
        {/* <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box> */}
      </Box>
    </Box>
  );
};

export default PayUsingCard;
