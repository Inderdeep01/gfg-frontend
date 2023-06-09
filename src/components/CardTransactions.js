
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector } from 'react-redux';
import { URL } from '../ServerURL';
import axios from 'axios';
import { NetworkGradient, NetworkImage } from '../utils/gradientAndImages';
import InfiniteScroll, {} from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
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
        // color:'#7e7e8f',
    },
}))
const CardTransactions = ({setTransact,cardId}) => {
    useEffect(()=>{
        // console.log('Calling Fetch',cardId)
        setPage(1);
        setTransactions([]);
        fetchTransactions();
    },[cardId])

    const [more,setMore]=useState(true);
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
            const {data}=await axios.post(`${URL}/getTx/card?page=${page}`,{
                _id:cardId,
            },config);
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


    const fetchTX=async()=>{
        // console.log('Calling Fetch Txs')
        try{
            const config={
                headers:{
                    "Content-Type":'application/json',
                    'Authorization':`Bearer ${userInfo.token}`
                }
            }
            const {data}=await axios.post(`${URL}/getTx/card?page=1`,{
                _id:cardId,
            },config);
            setPage(page+1);
            setLoading(false);
            if(data?.length===0){
                setMore(false);
            }
            else{
                setTransactions([...data]);
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
        setPage(1);
        fetchTX();
    },[userInfo])
    // console.log(transactions);
    function mini(num){
        return num?.substr(num?.length-4,num?.length);
    }
    const navigate=useNavigate();
    const [card,setCard]=useState(null);
    const {cards}=useSelector(state=>state.cardsList);
    useEffect(()=>{
        const c=cards.filter((cr)=>cr._id===cardId)[0];
        setCard(c);
    },[])
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
                    Card Transactions
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
                }} id="accountTransactionDiv">
                <InfiniteScroll
                    dataLength={transactions?.length<=20 || !transactions?20:transactions?.length}
                    next={fetchTransactions}
                    // inverse={true}
                    hasMore={more}
                    loader={<Box sx={{width:'100%',display:'flex',justifyContent:'center'}}><CircularProgress size={30} sx={{color:'#1979e6'}}/></Box>}
                    scrollableTarget="accountTransactionDiv"
                >
                {transactions?.map((transaction,index)=>{
                    return (
                        <Box key={index} sx={{
                            width:'100%',
                            height:'70px',
                            display:'flex',
                            alignItems:'center',
                            borderBottom:'1px solid lightgrey',
                            cursor:'pointer',
                            '&:hover':{
                                background:'#e0e1e7'
                            }
                        }} onClick={()=>navigate(`/?transactionDetails=${transaction._id}`)}>
                            <Box className={classes.center} sx={{width:'40%',display:'flex',gap:'10px'}}>
                                <Box sx={{width:'35%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Box sx={{
                                        width:'90%',
                                        height:'80%',
                                        borderRadius:'10px',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <img src={"https://cdn.vox-cdn.com/thumbor/sW5h16et1R3au8ZLVjkcAbcXNi8=/0x0:3151x2048/2000x1333/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png"} style={{
                                            width:'100%',
                                            height:'100%',
                                            objectFit:'cover'
                                        }} />
                                    </Box>
                                </Box>
                                <Box sx={{width:'55%',height:'50px'}}>
                                    <Box>*{
                                        transaction?.type==='simpleTransfer'?
                                        `XX ${mini(transaction?.to?.accountNo)}`
                                        :
                                        transaction?.type==='Deposit'?
                                        `XX ${mini(transaction?.to?.accountNo)}`
                                        :
                                        transaction?.type==='card'?
                                        `${mini(card?.cardNumber)}`
                                        :
                                        ''
                                        }</Box>
                                    <Box sx={{fontSize:'13px'}}>{transaction?.type==='card'?transaction?.card?.purpose:'IPBS Bank'}</Box>
                                </Box>
                            </Box>
                            <Box className={classes.center} sx={{width:'40%'}}>Netflix</Box>
                            <Box className={classes.center} sx={{
                                width:'20%',
                                color:(transaction?.from?._id===userInfo?._id)?'red':'green',
                                fontWeight:'500'
                            }}
                            > {transaction?.from===null || transaction?.from?._id!==userInfo?._id?'+':'-'} {transaction?.currency==='INR'?'₹':'$'} {transaction?.amount}</Box>
                        </Box>
                    )
                })}
                </InfiniteScroll>
                {!loading && transactions?.length===0 && <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <ReceiptLongIcon sx={{fontSize:'100px',color:'#1979e6'}}/>
                    <Box sx={{fontSize:'25px',fontWeight:'700'}}>No Transactions Yet</Box>
                    <Box sx={{width:'85%',textAlign:'center'}}>After your first transaction you will be able to view here</Box>
                    </Box>}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default CardTransactions