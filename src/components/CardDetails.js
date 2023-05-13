import { makeStyles } from "@material-ui/core";
import { Box, Menu, MenuItem, TextField, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NetworkGradient, NetworkImage } from "../utils/gradientAndImages";
import CardDelete from "./CardDelete";
import MenuIcon from '@mui/icons-material/Menu';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BlockIcon from '@mui/icons-material/Block';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import BlockCard from "./BlockCard";
import ChangePin from "./ChangePin";
import SetLimit from "./SetLimit.js";
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
        // right:'10px',
        // top:'10px',
        bottom:'30px',
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
        width:'110px',
        height:'75px',
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
    }
}))
const CardDetails = ({setTransact,cardId}) => {
    const classes=useStyle();
    const {userInfo}=useSelector(state=>state.userLogin)
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });
      const {cards}=useSelector(state=>state.cardsList);
      const [card,setCard]=useState({});
      const [open,setOpen]=useState(false);


      useEffect(()=>{
        const c=cards?.filter((cr)=>cr._id===cardId)[0];
        setCard(c);
        setCopy(false);
      },[cardId,cards]);



    const [copy,setCopy]=useState(false);
    const copyhandler=()=>{
      setCopy(true);
      navigator.clipboard.writeText(card?.cardNumber);
      setTimeout(()=>{
          setCopy(false)
      },5000)
    }

    const [del,setDel]=useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const o = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const [block,setBlock]=useState(false);
    const [unblock,setUnBlock]=useState(false);
    const blockUnblockHandler=()=>{
      if(card.isBlocked){
        setUnBlock(true);
      }
      else{
        setBlock(true);
      }
    }
    const [pin,setPin]=useState(false);
    const [limit,setLimit]=useState(false);
  return (
    <Box sx={{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        position:'relative'
    }}>
    <Box className={classes.btn} onClick={()=>setTransact(true)}>View Transactions</Box>
    {/* Menu Button */}
    {card?.owner?._id===userInfo?._id && 
    <Box>
    <Box sx={{
      color:'#1979e6',
      position:'absolute',
      top:'20px',
      right:'20px',
      cursor:'pointer',
      '&:hover':{color:'black'}
      }} 
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <MenuIcon sx={{fontSize:'35px'}}/>
    </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        open={o}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{handleClose();setPin(true)}}><VpnKeyIcon sx={{marginRight:'10px'}}/>Change PIN</MenuItem>
        <MenuItem onClick={()=>{handleClose();setLimit(true)}}><WifiProtectedSetupIcon sx={{marginRight:'10px'}}/>Set Limit</MenuItem>
        <MenuItem onClick={()=>{handleClose();blockUnblockHandler()}}><BlockIcon sx={{marginRight:'10px'}}/>{card?.isBlocked?'UnBlock':'Block'} Card</MenuItem>
        <MenuItem onClick={()=>{handleClose();setDel(true)}}><DeleteOutlineIcon sx={{marginRight:'10px'}}/>Delete Card</MenuItem>
      </Menu>
    </Box>
    }
    <Box className={classes.card}
    sx={{
        background:NetworkGradient[card?.network],
        color:'white',
        position:'relative',
        border:card?.isBlocked && '5px outset red',
    }}
    >
      <ThemeProvider theme={darkTheme}>
        <img src='/img/chip.png' className={classes.img}/>
        <img src={`${NetworkImage[card?.network]}`} className={classes.cardLogo}/>
        <Box sx={{marginBottom:'10px',fontWeight:'200'}}>{card?.purpose}</Box>
        <Box sx={{color: "white",fontSize: "12px",}}>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>
            {card?.owner?.firstName + " " + card?.owner?.lastName}
          </span>
        </Box>
        <Box sx={{
            marginTop:'30px',
            position:'relative',
            width:'220px',
        }}>{card?.cardNumber?.substr(0,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(4,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(8,4)}&nbsp;&nbsp;&nbsp;{card?.cardNumber?.substr(12,4)}&nbsp;&nbsp;&nbsp;{copy===false?<ContentCopyIcon onClick={copyhandler} sx={{width:'14px',cursor:'pointer',position:'absolute'}}/>:<DoneIcon sx={{color:'white',fontSize:'18px'}}/>}</Box>
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
    {/* <Box className={classes.pay} sx={{
      '&:hover':{
        color:!card?.isBlocked && 'white',
        background: !card?.isBlocked && '#1979e6',
      },
      cursor:card?.isBlocked?'not-allowed':'pointer'
    }}
    onClick={()=>{if(card.isBlocked===false){setOpen(true)}}}>Pay Using card</Box> */}

    <CardDelete open={del} setOpen={setDel} card={card}/>
    <BlockCard open={block} setOpen={setBlock} card={card} method="block"/>
    <BlockCard open={unblock} setOpen={setUnBlock} card={card} method="unblock"/>
    <ChangePin open={pin} setOpen={setPin} card={card}/>
    <SetLimit open={limit} setOpen={setLimit} card={card}/>
    </Box>
  );
};

export default CardDetails;
