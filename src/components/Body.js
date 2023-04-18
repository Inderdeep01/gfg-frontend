import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useLocation, useParams } from 'react-router-dom';
import Transfer from '../pages/Transfer';
import Forex from '../pages/Forex';
import DashBoard from '../pages/DashBoard';
import Error from '../pages/Error';
import Settings from '../pages/Settings';
import Notification from '../pages/Notification';
import CardSelected from './CardSelected';

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
    return (
      <Box className={classes.outer}>
        {page===undefined?<DashBoard/>:page==='transfer'?<Transfer/>:page==='forex'?<Forex/>:page==='notifications'?<Notification/>:page==='settings'?<Settings/>:page==='card' && no!==undefined?<CardSelected cardId={no}/>:<Error/>}
      </Box>
    )
}

export default Body