import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NetworkGradient, NetworkImage } from '../utils/gradientAndImages';

const useStyle=makeStyles((theme)=>({
    outer:{
        // cursor:'pointer',
        width:'100%',
        height:'80px',
        borderRadius:'15px',
        display:'flex',
        position:'relative'
    },
    left:{
        width:'100%',
        height:'100%',
        padding:'15px',
        gap:'8px',
        display:'flex',
        flexDirection:'column'
    },
    right:{
        position:'absolute',
        width:'20%',
        height:'100%',
        padding:'15px',
        right:'-0px'
    },
    cardLogo:{
        width:'50px',
        height:'50px',
        objectFit:'contain'
    },
}))
const Card = ({id,cardName,cardNumber,cardCompany,setSide}) => {
    const classes=useStyle();
    const navigate=useNavigate();
  return (
    <Box className={classes.outer}
    sx={{
        background:NetworkGradient[cardCompany],
        cursor:`pointer`
    }}
    onClick={()=>{
        navigate(`/card?no=${id}`);
        setSide(false);
    }}
    >
        <Box className={classes.left}>
            <Box sx={{color:'white',fontWeight:'500',fontSize:'14px'}}>{cardName}</Box>
            <Box sx={{color:'white',fontWeight:'450',fontSize:'14px'}}>{cardNumber.substr(0,4)}****{cardNumber.substr(cardNumber.length-4,cardNumber.length)}</Box>
        </Box>
        <Box className={classes.right}>
            <img src={NetworkImage[cardCompany]} className={classes.cardLogo}/>
        </Box>
    </Box>
  )
}

export default Card