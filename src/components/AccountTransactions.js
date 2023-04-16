
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        position:'relative'
    },
    back:{
        width:'fit-content',
        cursor:'pointer',
        padding:'5px',
        display:'none',
        position:'absolute',
        left:'0px',
        color:'rgb(25, 121, 230)',
        [theme.breakpoints.down("sm")]:{
            display:'flex',
        }
    },
    inner:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    transactions:{
        background:'white',
        display:'flex',
        flexDirection:'column',
        width:'90%',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius:'20px',
        height:'90%',
        [theme.breakpoints.down("sm")]:{
            marginTop:'20px',
            width:'80%'
        },
        [theme.breakpoints.down("xs")]:{
            marginTop:'0px',
            width:'100%',
            height:'100%'
        },
        alignItems:'center',
    },
    center:{
        padding:'5px',
        color:'#7e7e8f',
    },
    images:{
        width:'70%',
        height:'70%',
        objectFit:'contain'
    }
}))
const AccountTransactions = ({setTransact}) => {
    const classes=useStyle();
    const transactions=[
        {
            network:'VISA',
            cardNo:'100000000000000000',
            cardPurpose:'Saving Card',
            amount:'1000',
            currency:'INR',
            to:'Money Batish'
        },
        {
            network:'IPBS',
            cardNo:'100000000000000000',
            cardPurpose:'Saving Card',
            amount:'1000',
            currency:'INR',
            to:'Money Batish'
        },
        {
            network:'Mastercard',
            cardNo:'100000000000000000',
            cardPurpose:'Saving Card',
            amount:'1000',
            currency:'INR',
            to:'Money Batish'
        }
    ]
    const obj={
        'VISA':'/img/VISA.png',
        'Mastercard':'/img/Mastercard.png',
        'IPBS':'/img/IPBS.png',
        'Amex':'/img/Amex.png',
        'RuPay':'img/RuPay.png'
    }
    const colors=[
        '#fa3434',
        '#044ad2',
        '#2e2e3a',
        '#6b12b1'
    ]
  return (
    <Box className={classes.outer}>
        <Box className={classes.back} onClick={()=>{setTransact(false)}}><ArrowBackIosNewIcon sx={{fontSize:'30px'}}/></Box>
        <Box className={classes.inner}>
            <Box className={classes.transactions}>
                <Box sx={{
                    fontSize:'20px',
                    marginTop:'20px',
                    fontWeight:'bold',
                    marginBottom:'20px',
                }}>
                    Account Transactions
                </Box>
                <Box sx={{
                    width:'90%',
                    display:'flex',
                    background:'#f8f9fb',
                }}>
                    <Box className={classes.center} sx={{width:'40%'}}>Card</Box>
                    <Box className={classes.center} sx={{width:'40%'}}>To</Box>
                    <Box className={classes.center} sx={{width:'20%'}}>Amount</Box>
                </Box>
                <Box sx={{
                    width:'90%',
                    height:'80%',
                    overflowY:'scroll',
                    msOverflowStyle:'none',
                        '&::-webkit-scrollbar':{
                            display:'none'
                        },
                }}>
                {transactions?.map((transaction,index)=>{
                    return (
                        <Box sx={{
                            width:'100%',
                            height:'70px',
                            display:'flex',
                            alignItems:'center',
                            borderBottom:'1px solid lightgrey'
                        }}>
                            <Box className={classes.center} sx={{width:'40%',display:'flex',gap:'10px'}}>
                                <Box sx={{width:'35%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Box sx={{
                                        background:colors[index%4],
                                        width:'90%',
                                        height:'80%',
                                        borderRadius:'10px',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <img src={`${obj[transaction?.network]}`} className={classes.images} />
                                    </Box>
                                </Box>
                                <Box sx={{width:'55%',height:'50px'}}>
                                    <Box>*{transaction?.cardNo.substring(transaction?.cardNo.length-4,transaction?.cardNo.length)}</Box>
                                    <Box sx={{fontSize:'13px'}}>{transaction?.cardPurpose}</Box>
                                </Box>
                            </Box>
                            <Box className={classes.center} sx={{width:'40%'}}>{transaction?.to}</Box>
                            <Box className={classes.center} sx={{width:'20%'}}>{transaction?.currency==='INR'?'₹':'$'} {transaction?.amount}</Box>
                        </Box>
                    )
                })}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default AccountTransactions