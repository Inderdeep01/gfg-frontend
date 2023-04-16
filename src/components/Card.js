import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

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
const Card = ({id,cardName,cardNumber,cardCompany,gradient,setSide}) => {
    const classes=useStyle();
    const grad=[
        'linear-gradient(103deg, rgba(83,1,248,1) 0%, rgba(255,1,48,1) 100%)',
        'linear-gradient(103deg, rgba(65,41,90,1) 0%, rgba(47,7,67,1) 100%)',
        'linear-gradient(103deg, rgba(0,154,157,1) 0%, rgba(1,203,108,1) 100%)',
        'radial-gradient(circle farthest-side, #fceabb, #f8b500)',
        
    ]
    const obj={
        'VISA':'/img/VISA.png',
        'Mastercard':'/img/Mastercard.png',
        'IPBS':'/img/IPBS.png',
        'Amex':'/img/Amex.png',
        'RuPay':'img/RuPay.png'
    }
    const navigate=useNavigate();
  return (
    <Box className={classes.outer}
    sx={{
        background:grad[gradient],
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
            <img src={obj[cardCompany]} className={classes.cardLogo}/>
        </Box>
    </Box>
  )
}

export default Card