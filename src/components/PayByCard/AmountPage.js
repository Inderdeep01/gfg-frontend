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
const PayUsingCard = ({amount,setAmount,account,setAmountPage,setPINPage,setRecipientPage,card,token,setToken}) => {
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
    if ((n = n.toString()).length > 9) return 'overflow';
    n = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str+=' Only'
    // str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
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
          setPINPage(false);
          setRecipientPage(true);
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
                setAmount(e.target.value);
              }}
              InputProps={{
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
          border:'1px solid grey',
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
              <img src={NetworkImage[card?.network]} height={50} width={50}/>
            </Box>
            <Box sx={{
              width:'80%',
              display:'flex',
              flexDirection:'column'
            }}>
              <Box>Pay</Box>
              <Box sx={{fontSize:'18px',fontWeight:'600'}}>Inter Planetary Bank XX {card?.cardNumber?.substr(card?.cardNumber?.length-4,card?.cardNumber?.length)}</Box>
            </Box>
          </Box>
          <Box className={classes.generate}
          sx={{
            background:amount?'#1979e6':'lightgrey',
            cursor:amount?'pointer':'not-allowed'
          }}
          onClick={()=>{
            if(amount){
              setAmountPage(false);
              setPINPage(true);
            }
          }}>PAY</Box>
        </Box>
        {/* <Box className={classes.cancel} onClick={()=>{setOpen(false)}}>CANCEL</Box> */}
      </Box>
    </Box>
  );
};

export default PayUsingCard;
