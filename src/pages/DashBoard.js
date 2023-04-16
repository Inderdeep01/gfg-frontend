import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import Balance from '../components/Balance';
import AccountTransactions from '../components/AccountTransactions';

const useStyle=makeStyles((theme)=>({
    outer:{
        width:'100%',
        height:'100%',
        display:'flex',
        position:'relative',
        background:'#f2f3f7',
    },
    front:{
      width:'60%',
      height:'100%',
      background:'#f2f3f7',
      [theme.breakpoints.down("sm")]:{
        position:'absolute',
        width:'100%',
      }
    },
    transaction:{
      width:'40%',
      height:'100%',
      background:'#f2f3f7',
      [theme.breakpoints.down("sm")]:{
        position:'absolute',
        width:'100%',
      }
    }
}))
const DashBoard = () => {
  const [transact,setTransact]=useState(false);
    const classes=useStyle();
  return (
    <Box className={classes.outer}>
      <Box className={classes.front} sx={{zIndex:transact?0:1,}}>
        <Balance setTransact={setTransact}/>
      </Box>
      <Box className={classes.transaction} sx={{zIndex:transact?1:0,}}>
        <AccountTransactions setTransact={setTransact}/>
      </Box>
    </Box>
  )
}

export default DashBoard