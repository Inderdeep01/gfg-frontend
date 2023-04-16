import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import CardTransactions from './CardTransactions';
import CardDetails from './CardDetails';

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
const CardSelected = ({cardId}) => {
  const [transact,setTransact]=useState(false);
    const classes=useStyle();
  return (
    <Box className={classes.outer}>
      <Box className={classes.front} sx={{zIndex:transact?0:1,}}>
        <CardDetails setTransact={setTransact} cardId={cardId}/>
      </Box>
      <Box className={classes.transaction} sx={{zIndex:transact?1:0,}}>
        <CardTransactions setTransact={setTransact} cardId={cardId}/>
      </Box>
    </Box>
  )
}

export default CardSelected