import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCard from './AddCard';
import { useEffect, useState } from 'react';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Actions/userActions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { getCards } from '../store/Actions/cardActions';

const useStyle=makeStyles((theme)=>({
    outer:{
        width:'20%',
        height:'93vh',
        borderRight:'1px solid lightgrey',
        background:'#ffffff',
        [theme.breakpoints.down("sm")]:{
            position:'absolute',
            zIndex:'2',
            width:'30%',
            transition:`all 0.5s ${theme.transitions.easing.easeInOut}`,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
        },
        [theme.breakpoints.down("xs")]:{
            width:'55%',
            height:'93vh'
        },
        overflowY:'scroll',
        // overflowX:'hidden',
        msOverflowStyle:'none',
        '&::-webkit-scrollbar':{
            display:'none'
        },
    },
    inner:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'15px',
        marginTop:'10px'
    },
    mycards:{
        marginTop:'20px',
        width:'100%',
        height:'fit-content',
        borderBottom:'1px solid lightgrey',
        // border:'1px solid red',
    },
    cardHead:{
        width:'85%',
        display:'flex',
        flexDirection:'row',
        position:'relative',
        marginBottom:'10px',
        cursor:'pointer',
    },
    cardlist:{
        width:'84%',
        overflow:'hidden',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        gap:'10px',
        transition:'all 300ms',
        // height:'fit-content'
    },
    menu:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        marginTop:'30px',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
    },
    menuItem:{
        width:'82%',
        borderRadius:'10px',
        height:'30px',
        display:'flex',
        alignItems:'center',
        cursor:'pointer',
        '&:hover':{
            background:'#f4f4f4',
        }
    },
    logout:{
        width:'100%',
        height:'50px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    logoutbtn:{
        width:'85%',
        height:'30px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'20px',
        background:'#0050ff',
        color:'white',
        cursor:'pointer',
        transition:'all 200ms',
        '&:hover':{
            width:'88%',
            height:'33px'
        }
    }
}))
const Sidebar = ({side,setSide}) => {
    const [showCards,setShowCards]=useState(true);
    const classes=useStyle();
    const dispatch=useDispatch();
    var loc=useLocation().pathname.split('/')[1];
    const {loading,cards,error}=useSelector(state=>state.cardsList);

    // console.log(cards);

    useEffect(()=>{
        dispatch(getCards());
    },[])

    const navigate=useNavigate();
    const handleClick=(e)=>{
        var l=loc;
        if(l===''){
            l='dashboard';
        }
        const route=e.target.attributes.data.value;
        if(l!==route){
            if(route==='dashboard'){
                navigate('/')
            }
            else{
                navigate(`/${route}`);
            }
        }
        setSide(false);
    }
  return (
    <Box className={`${classes.outer} clickbox`} sx={{left:side?'0px':'-400px'}}>
        <Box className={classes.mycards}>
            <Box className={classes.inner}>
                <Box className={classes.cardHead} onClick={()=>{setShowCards(!showCards)}}>
                    <Box sx={{color:'#70707c',fontSize:'18px',fontWeight:'600'}}>My Cards</Box>
                    {showCards?<KeyboardArrowUpIcon sx={{color:'#70707c',position:'absolute',right:'10px',cursor:'pointer'}}/>:<KeyboardArrowDownIcon sx={{color:'#70707c',position:'absolute',right:'10px',cursor:'pointer'}}/>}
                </Box>
                <Box className={`${classes.cardlist}`} sx={{
                    height:showCards?`${(cards?.length+1)*85}px`:'0px',
                }}>
                    {cards?.map((card,index)=>{
                        return <Card id={card?._id} key={`${index}`} cardName={card?.purpose} cardNumber={card?.cardNumber} cardCompany={card?.network} gradient={index}  setSide={setSide}/>
                    })}
                    {cards?.length<5 && <AddCard/>}
                </Box>
            </Box>
        </Box>
        <Box className={classes.menu}>
            <Box className={classes.menuItem} sx={{background:(loc==='' || loc==='dashboard')?'#f4f4f4':'transparent'}} data="dashboard" onClick={handleClick}><DashboardOutlinedIcon sx={{color:'#70707c',fontSize:'20px',marginLeft:'10px',marginRight:'10px'}}/>DashBoard</Box>
            <Box className={classes.menuItem} sx={{background:loc==='transfer'?'#f4f4f4':'transparent'}} data="transfer" onClick={handleClick}><MonetizationOnOutlinedIcon sx={{color:'#70707c',fontSize:'20px',marginLeft:'10px',marginRight:'10px'}}/>Transfer</Box>
            <Box className={classes.menuItem} sx={{background:loc==='forex'?'#f4f4f4':'transparent'}} data="forex" onClick={handleClick}><CurrencyExchangeIcon sx={{color:'#70707c',fontSize:'20px',marginLeft:'10px',marginRight:'10px'}}/>Forex</Box>
            <Box className={classes.menuItem} sx={{background:loc==='notifications'?'#f4f4f4':'transparent'}} data="notifications" onClick={handleClick}><NotificationsIcon sx={{color:'#70707c',fontSize:'20px',marginLeft:'10px',marginRight:'10px'}}/> Notifications</Box>
            <Box className={classes.menuItem} sx={{background:loc==='settings'?'#f4f4f4':'transparent'}} data="settings" onClick={handleClick}><SettingsOutlinedIcon sx={{color:'#70707c',fontSize:'20px',marginLeft:'10px',marginRight:'10px'}}/> Settings</Box>
        </Box>
        <Box className={classes.logout}>
            <Box className={classes.logoutbtn} onClick={()=>{
                dispatch(logout());
            }}>Logout</Box>
        </Box>
    </Box>
  )
}

export default Sidebar