import { makeStyles } from '@material-ui/core'
import { Box, IconButton, InputAdornment, Skeleton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadingIcon from '@mui/icons-material/Downloading';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
import Deposit from './Deposit';
import axios from 'axios';
import { URL } from '../ServerURL';
import { getbalance } from '../store/Actions/AccountBalanceActions';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRCode from './QRCode';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import toast ,{Toaster} from 'react-hot-toast';
import './Carousel.css'
import { ToastHtml } from '../Toast';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFlag from 'react-currency-flags'
const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        position:'relative',
        // background:'transparent',
        // background:'url(https://t3.ftcdn.net/jpg/04/03/02/92/360_F_403029269_KCrGHt5AdtV7GSD2KeP8Wk2PYIbVKlNU.jpg)',
        background:'url(https://media.istockphoto.com/id/1267967888/photo/rendered-3d-blocks-minimalist-white-abstract-background.jpg?s=612x612&w=0&k=20&c=pbYQJ4raEaVC0arc6xdAB9IUThbfWZdRl9VnnaIu8vU=)',
        backgroundSize:'cover',
        backgroundPosition:'center',
        overflowY:'scroll',
        msOverflowStyle:'none',
        '&::-webkit-scrollbar':{
                display:'none'
        },
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
        gap:'50px',
    },
    balance:{
        width:'150px',
        cursor:'pointer',
        height:'130px',
        borderRadius:'20px',
        padding:'20px',
        background:'white',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        transition:`all 0.2s ${theme.transitions.easing.easeInOut}`,
        '&:hover':{
            transform:'translateY(-10px)',
        },
        [theme.breakpoints.down("xs")]:{
            width:'25vw'
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
        width:'fit-content',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'80px',
        // border:'1px solid red',
        gap:'100px',
        [theme.breakpoints.down("xs")]:{
            width:'100%',
            gap:'30px'
        }
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
        cursor:'pointer',
        [theme.breakpoints.down("xs")]:{
            width:'40px',
            height:'40px'
        }
    },
    wrap:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    transaction:{
        display:'none',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        [theme.breakpoints.down("sm")]:{
            display:'flex'
        }
    },
    detail:{
        background:'white',
        padding:'10px',
        paddingLeft:'20px',
        paddingRight:'20px',
        borderRadius:'10px',
        position:'relative',
        width:'100%',
        // border:'1px solid red',
        [theme.breakpoints.down("sm")]:{
            width:'80%'
        }
    },
    laoding:{
        cursor:'pointer',
        borderRadius:'20px',
    },
    TextField:{
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        },
        '& .MuiInputLabel-root.Mui-disabled': {
            color:'black',
        },
        '&:hover':{
            '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black', // Custom color for disabled fieldset border
              },
        }
    },
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
    const {balances,loading,error}=useSelector(state=>state.accountBalance);
    const [open,setOpen]=useState(false);
    const [qrOpen,setQrOpen]=useState(false);
    const navigate=useNavigate();
      const {transactions}=useSelector(state=>state.accountTransactions);
    //   console.log(transactions);
  return (
    <Box className={classes.outer}>
        {/* <Box className={classes.btn} onClick={()=>setTransact(true)}>View Transactions</Box> */}
        <Box className={classes.center}>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                gap:'20px',
                alignItems:'center'
            }}>
                <Box sx={{fontSize:'30px',fontWeight:'800'}}>Interplanetary Bank</Box>
                <TextField sx={{width:'100%'}} id="outlined-basic" label="Account Holder" variant="outlined" value={`${userInfo?.firstName} ${userInfo?.lastName?userInfo?.lastName:''}`} disabled className={classes.TextField}/>
                {/* <Box className={classes.detail}>Account Holder : {userInfo?.firstName} {userInfo?.lastName}</Box> */}
                {/* <Box className={classes.detail}>Email : {userInfo?.email}</Box> */}
                <TextField sx={{width:'100%'}} id="outlined-basic" label="Email" variant="outlined" value={`${userInfo?.email}`} disabled className={classes.TextField}/>
                <TextField sx={{width:'100%'}} id="outlined-basic" label='Account Number' variant="outlined" value={`${userInfo?.accountNo}`} disabled className={classes.TextField}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            >
                            {!copy?<ContentCopyIcon onClick={copyhandler} sx={{width:'20px',cursor:'pointer'}}/>:<DoneIcon sx={{color:'green'}}/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                  }}
                />
                {/* // <Box className={classes.detail} sx={{display:'flex',gap:'10px'}}>Account Number : {userInfo?.accountNo?.substr(0,5)}******{userInfo?.accountNo?.substr(userInfo?.accountNo?.length-5,userInfo?.accountNo?.length)}  {copy===false?<ContentCopyIcon onClick={copyhandler} sx={{width:'20px',cursor:'pointer'}}/>:<DoneIcon sx={{color:'green'}}/>}</Box> */}
                <Box className={classes.pay}>
                    <Box className={classes.wrap} onClick={()=>setQrOpen(true)}>
                        <Box className={classes.item}><QrCodeScannerIcon/></Box>
                        <Box>QRCode</Box>
                    </Box>
                    <Box className={classes.wrap} onClick={()=>setOpen(true)}>
                        <Box  className={classes.item}><DownloadingIcon/></Box>
                        <Box>Deposit</Box>
                    </Box>
                    <Box className={classes.wrap} onClick={()=>navigate('/pay')}>
                        <Box className={classes.item}><CurrencyExchangeIcon/></Box>
                        <Box>Pay</Box>
                    </Box>
                    <Box className={classes.transaction} onClick={()=>setTransact(true)}>
                        <Box className={classes.item}><ReceiptLongIcon/></Box>
                        <Box>Transactions</Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width:'100%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:'30px',
            }}>
                <Box sx={{width:'100%',display:'flex',justifyContent:'center',fontSize:'20px',fontWeight:'600'}}>Account Balance</Box>
                <Box sx={{width:'80%',display:'flex',gap:'30px',overflowX:'scroll',msOverflowStyle:'none',
                    // '&::-webkit-scrollbar':{
                    //         display:'none'
                    // },
                }}>
                {loading && <Skeleton variant='rectangular' width={170} height={190} className={classes.laoding}></Skeleton>}
                {balances?.map((curr)=>{
                    return (
                        <Box className={classes.balance} sx={{
                            color:'rgb(25, 121, 230)',
                        }}>
                            <Box className={`${curr?.currency==='INR'?classes.rupees:classes.usd}`}><CurrencyFlag currency={curr?.currency} /></Box>
                            <Box sx={{marginTop:'10px',fontSize:'20px',color:'black'}}>{curr?.currency}</Box>
                            <Box sx={{
                                color:curr?.currency==='INR'?'rgb(25, 121, 230)':'red',
                                fontSize:'30px',
                                fontWeight:'bold'
                            }}>{getSymbolFromCurrency(curr?.currency)}
                             <span style={{
                                fontSize:'30px',
                                fontWeight:'bold'
                            }}>{Number(curr?.balance).toFixed(2)}</span></Box>
                        </Box>
                    )
                })}
                </Box>
            </Box>
        </Box>
        <Deposit open={open} setOpen={setOpen}/>
        <QRCode open={qrOpen} setOpen={setQrOpen}/>
    </Box>
  )
}

export default Balance