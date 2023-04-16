import { makeStyles } from "@material-ui/core";
import { Box, TextField, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import PayUsingCard from "./PayUsingCard";

const useStyle=makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        outline:'0px solid white',
        width:'500px',
        height:'fit-content',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        borderRadius:'20px',
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down("xs")]:{
            width:'100%',
            height:'100%',
            borderRadius:'0px'
        }
        // padding: theme.spacing(2, 4, 3),
      },
      textfield:{
        [theme.breakpoints.down("xs")]:{
            width:'60%'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
      },
      cancel:{
        width:'115px',
        height:'40px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'20px',
        // background:'#0050ff',
        border:'1px solid #1979e6',
        color:'#1979e6',
        cursor:'pointer',
        '&:hover':{
            background:'#1979e6',
            color:'white',
        }
      },
      generate:{
        width:'115px',
        height:'40px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'20px',
        background:'#1979e6',
        border:'1px solid #1979e6',
        color:'white',
        cursor:'pointer',
        '&:hover':{
            background:'#1979e6',
            color:'white',
        }
      },
      card:{
        width:'350px',
        height:'200px',
        padding:'20px',
        marginBottom:'10px',
        borderRadius:'20px',
        position:'relative',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        [theme.breakpoints.down("xs")]:{
            width:'75%',
        }
      },
      img:{
        width:'50px',
        height:'50px',
        transition:`all 0.5s ${theme.transitions.easing.easeInOut}`,
        objectFit:'contain',
        cursor:'pointer',
      },
      imgSelected:{
        cursor:'pointer',
        width:'65px',
        height:'65px',
        border:'1px solid white',
        borderRadius:'10px',
        transition:`all 0.5s ${theme.transitions.easing.easeInOut}`,
        objectFit:'contain',
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
    img:{
        position:'absolute',
        width:'120px',
        height:'100px',
        objectFit:'contains',
        right:'0px',
        bottom:'10px'
    },
    cardLogo:{
        position:'absolute',
        width:'80px',
        height:'80px',
        objectFit:'contain',
        right:'20px',
        top:'20px'
    },
    showBtn:{
        padding:'5px',
        paddingLeft:'10px',
        paddingRight:'10px',
        background:'rgb(25, 121, 230)',
        width:'fit-content',
        borderRadius:'20px',
        cursor:'pointer',
        position:'absolute',
        bottom:'20px',
    },
    pay:{
        marginTop:'30px',
        display:'flex',
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
    }
}))
const CardDetails = ({setTransact,cardId}) => {
    const grad=[
        'linear-gradient(103deg, rgba(83,1,248,1) 0%, rgba(255,1,48,1) 100%)',
        'linear-gradient(103deg, rgba(65,41,90,1) 0%, rgba(47,7,67,1) 100%)',
        'linear-gradient(103deg, rgba(0,154,157,1) 0%, rgba(1,203,108,1) 100%)',
        'radial-gradient(circle farthest-side, #fceabb, #f8b500)'
    ]
    const obj={
        'VISA':'/img/VISA.png',
        'Mastercard':'/img/Mastercard.png',
        'IPBS':'/img/IPBS.png',
        'Amex':'/img/Amex.png',
        'RuPay':'img/RuPay.png'
    }
    const classes=useStyle();
    const {userInfo}=useSelector(state=>state.userLogin)
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      const {cards}=useSelector(state=>state.cardsList);
      const [card,setCard]=useState({});
      const [index,setIndex]=useState(0);
      const [open,setOpen]=useState(false);
      useEffect(()=>{
        const c=cards?.filter((cr,i)=>{
        if(cr._id===cardId){
            setIndex(i);
            return true;
        }
        return false;
        })[0];
        setCard(c);
      },[cardId,cards]);
    //   console.log(cardId);
    // const [show,setShow]=useState(false);
  return (
    <Box sx={{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }}>
    <Box className={classes.btn} onClick={()=>setTransact(true)}>View Transactions</Box>
    <Box className={classes.card}
    sx={{
        background:grad[index],
        color:'white',
        position:'relative'
    }}
    >
      <ThemeProvider theme={darkTheme}>
        <img src='/img/chip.png' className={classes.img}/>
        <img src={`${obj[card?.network]}`} className={classes.cardLogo}/>
        <Box sx={{marginBottom:'10px',fontWeight:'200'}}>{card?.purpose}</Box>
        <Box sx={{color: "white",fontSize: "12px",}}>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>
            {userInfo?.firstName + " " + userInfo?.lastName}
          </span>
        </Box>
        <Box sx={{
            marginTop:'30px'
        }}>{card?.cardNumber?.substr(0,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(4,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(8,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(12,4)}&nbsp;&nbsp;&nbsp;<ContentCopyIcon fontSize="10" sx={{cursor:'pointer'}} onClick={()=>{navigator.clipboard.writeText(card?.cardNumber)}}/></Box>
        <Box sx={{
            marginTop:'30px',
            display:'flex',
            gap:'30px'
        }}>
            <Box>Expiry - {card?.expiryDate}</Box>
            <Box> CVV - {card?.cvv}</Box>
        </Box>
        {/* <Box className={classes.showBtn}>{show?'Show Details':'Hide Details'}</Box> */}
      </ThemeProvider>
    </Box>
    <Box className={classes.pay} onClick={()=>setOpen(true)}>Pay Using card</Box>
    <PayUsingCard open={open} setOpen={setOpen} cardNumber={card?.cardNumber}/>
    </Box>
  );
};

export default CardDetails;
