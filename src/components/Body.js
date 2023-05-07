import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useLocation, useParams } from 'react-router-dom';
// import Transfer from '../pages/Transfer';
import Forex from '../pages/Forex';
import DashBoard from '../pages/DashBoard';
import Error from '../pages/Error';
import Settings from '../pages/Settings';
// import Notification from '../pages/Notification';
import CardSelected from './CardSelected';
// import PayUsingCard from './Transfer/PayUsingCard';
import { useDispatch, useSelector } from 'react-redux';
import { getbalance } from '../store/Actions/AccountBalanceActions';
import io from 'socket.io-client';
import { URL } from '../ServerURL';
import { ADD_ACCOUNT_TRANSACTION, SET_SOCKET } from '../store/Constants/TransactionsConstant';

const useStyle=makeStyles((theme)=>({
    outer:{
        width:'80%',
        background:'rgb(237, 237, 244)',
        height:'92.5vh',
        [theme.breakpoints.down("sm")]:{
            width:'100%',
        }
    }
}))
const Body = () => {
    const classes=useStyle();
    const {page}=useParams();
    const {search}=useLocation();
    const [no,setNo]=useState();
    useEffect(()=>{
      if(page==='card'){
        const query = new URLSearchParams(search);
        const n = query.get('no');
        setNo(n);
      }
    },[search])
    const {userInfo}=useSelector(state=>state.userLogin);
    const {balances}=useSelector(state=>state.accountBalance);
    const {transactions}=useSelector(state=>state.accountTransactions);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!balances){
            dispatch(getbalance());
        }
    },[userInfo])
    const {socket}=useSelector(state=>state.socket);
    useEffect(()=>{
      dispatch({type:SET_SOCKET,payload:io(URL)});
    },[])
    useEffect(()=>{
      if(socket){
        socket.emit("setup",userInfo?.token);
        socket.on("connected",()=>console.log('Connected to websocket'));
        socket.on("newTransactionRecieved",(tx)=>{
          dispatch({type:ADD_ACCOUNT_TRANSACTION,payload:tx});
        })
      }
    },[socket])
    console.log(transactions);
    return (
      <Box className={classes.outer}>
        {page===undefined?<DashBoard/>:page==='forex'?<Forex/>:page==='settings'?<Settings/>:page==='card' && no!==undefined?<CardSelected cardId={no}/>:<Error/>}
      </Box>
    )
}

export default Body