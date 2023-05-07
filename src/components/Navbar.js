import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const useStyle=makeStyles((theme)=>({
    outer:{
      width:'100%',
      height:'50px',
      display:'flex',
      alignItems:'center',
      borderBottom:'1px solid lightgrey',
      background:'#ffffff',
      position:'relative'
    },
    logo:{
      width:'fit-content',
      height:'100%',
      marginLeft:'50px',
      [theme.breakpoints.down('sm')]:{
        marginLeft:'20px'
      },
      display:'flex'
    },
    logoImg:{
      width:'120px',
      height:'100%',
      objectFit:'contain'
    },
    navItem:{
      position:'absolute',
      right:'30px',
      display:'flex',
      gap:'15px',
      alignItems:'center'
    },
    bell:{
      color:'#c6c6c6'
    },
    user:{
      width:'fit-content',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    userLogo:{
      width:'30px',
      height:'90%',
      borderRadius:'50%',
      marginRight:'10px'
    },
    name:{
      fontSize:'18px',
      fontWeight:'500'
    },
    ham:{
      marginLeft:'20px',
      display:'flex',
      cursor:'pointer',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      gap:'2px',
      width:'fit-content',
      [theme.breakpoints.up('md')]:{
        display:'none',
      },
    },
    hamAnimateIn:{
      animation:`$animatein 500ms ${theme.transitions.easing.easeInOut}`
    },
    hamAnimateOut:{
      animation:`$animateout 400ms ${theme.transitions.easing.easeIn} reverse`
    },
    line:{
      display:'flex',
      gap:'2px'
    },
    item:{
      width:'6px',
      height:'6px',
      border:'3px solid #c6c6c6',
      borderRadius:'2px'
    },
    '@keyframes animatein':{
      "0%":{
        transform:'rotate(0deg)',
      },
      '100%':{
        transform:'rotate(180deg)'
      }
    },
    '@keyframes animateout':{
      "0%":{
        transform:'rotate(0deg)',
      },
      '100%':{
        transform:'rotate(180deg)'
      }
    },
}))
const Navbar = ({side,setSide}) => {
  const {userInfo} =useSelector(state=>state.userLogin);
    const classes=useStyle();
  return (
    <Box className={classes.outer}>
      <Box id="ham" className={`${classes.ham} ${side && classes.hamAnimateIn} ${!side && classes.hamAnimateOut}`}
      onClick={()=>{
        setSide(!side);
      }}>
          <Box className={classes.line}>
            <Box className={classes.item}></Box>
            <Box className={classes.item}></Box>
          </Box>
          <Box className={classes.line}>
            <Box className={classes.item}></Box>
            <Box className={classes.item}></Box>
          </Box>
        </Box>
      <Box className={classes.logo}>
        <img src="/img/logo.png" className={classes.logoImg}/>
      </Box>
      <Box className={classes.navItem}>
        <Box className={classes.user}>
          <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className={classes.userLogo}/>
          <Box className={classes.name}>{userInfo?.firstName} {userInfo?.lastName}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar