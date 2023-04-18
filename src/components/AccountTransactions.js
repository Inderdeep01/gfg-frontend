
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector } from 'react-redux';
import { URL } from '../ServerURL';
import axios from 'axios';
import { NetworkGradient, NetworkImage } from '../utils/gradientAndImages';
import InfiniteScroll, {} from 'react-infinite-scroll-component'

const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        position:'relative',
        display:'flex'
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
        // border:'1px solid red',
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
}))
const AccountTransactions = ({setTransact}) => {
    const [more,setMore]=useState();
    const classes=useStyle();
    const [transactions,setTransactions]=useState([]);
    const {userInfo}=useSelector(state=>state.userLogin);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [page,setPage]=useState(1);
    const fetchTransactions=async()=>{
        try{
            const config={
                headers:{
                    "Content-Type":'application/json',
                    'Authorization':`Bearer ${userInfo.token}`
                }
            }
            const {data}=await axios.get(`${URL}/getTx?page=${page}`,config);
            // console.log(data);
            setPage(page+1);
            if(data?.length===0){
                setMore(false);
            }
            else{
                setTransactions([...transactions,...data]);
            }
        }
        catch(err)
        {
            var e=err.response && err.response.data.message? err.response.data.message:err.message;
            // setLoading(false);
            setError(e);
        }
    }
    useEffect(()=>{
        fetchTransactions();
    },[])
    // const transactions=[
    //     {
    //         network:'VISA',
    //         cardNo:'100000000000000000',
    //         cardPurpose:'Saving Card',
    //         amount:'1000',
    //         currency:'INR',
    //         to:'Money Batish'
    //     },
    //     {
    //         network:'IPBS',
    //         cardNo:'100000000000000000',
    //         cardPurpose:'Saving Card',
    //         amount:'1000',
    //         currency:'INR',
    //         to:'Money Batish'
    //     },
    //     {
    //         network:'Mastercard',
    //         cardNo:'100000000000000000',
    //         cardPurpose:'Saving Card',
    //         amount:'1000',
    //         currency:'INR',
    //         to:'Money Batish'
    //     }
    // ]
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
                    <Box className={classes.center} sx={{width:'40%'}}>To/From</Box>
                    <Box className={classes.center} sx={{width:'20%'}}>Amount</Box>
                </Box>
                <Box sx={{
                    width:'90%',
                    height:'80%',
                    overflowY:'scroll',
                    // // display:'flex',
                    // // justifyContent:'center',
                    // // alignItems:'center',
                    // // border:'1px solid blue',
                    // paddingBottom:'50px'
                    msOverflowStyle:'none',
                    '&::-webkit-scrollbar':{
                            display:'none'
                    },
                }}>
                <InfiniteScroll
                    dataLength={page*20}
                    next={fetchTransactions}
                    // inverse={true} //
                    hasMore={true}
                    loader={<span>Loading....</span>}
                    scrollableTarget="scrollableDiv"
                >
                {transactions?.map((transaction)=>{
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
                                        background:NetworkGradient[transaction?.card?.network],
                                        width:'90%',
                                        height:'80%',
                                        borderRadius:'10px',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <img src={`${transaction?.from!==null?NetworkImage[transaction?.card?.network]:NetworkImage['IPBS']}`} style={{
                                            width:transaction?.from===null?'50px':'70%',
                                            height:transaction?.from===null?'50px':'70%',
                                            objectFit:'contain'
                                        }} />
                                    </Box>
                                </Box>
                                <Box sx={{width:'55%',height:'50px'}}>
                                    <Box>*{transaction?.from!==null?transaction?.card?.cardNumber.substring(transaction?.card?.cardNumber?.length-4,transaction?.cardNumber?.length):transaction?.to?.accountNo?.substring(transaction?.to?.accountNo?.length-4,transaction?.to?.accountNo?.length)}</Box>
                                    <Box sx={{fontSize:'13px'}}>{transaction?.from!==null?transaction?.card?.purpose:'IPBS Bank'}</Box>
                                </Box>
                            </Box>
                            <Box className={classes.center} sx={{width:'40%'}}>{transaction?.to?.firstName} {transaction?.to?.lastName}</Box>
                            <Box className={classes.center} sx={{
                                width:'20%',
                                color:transaction?.from===null?'green':'red',
                                fontWeight:'500'
                            }}
                            > {transaction?.from===null?'+':'-'} {transaction?.currency==='INR'?'₹':'$'} {transaction?.amount}</Box>
                        </Box>
                    )
                })}
                </InfiniteScroll>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default AccountTransactions