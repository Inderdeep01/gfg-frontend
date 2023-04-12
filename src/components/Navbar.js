import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';

const useStyle=makeStyles((theme)=>({
    outer:{
      width:'100%',
      height:'50px',
      display:'flex',
      alignItems:'center',
      borderBottom:'1px solid lightgrey',
      background:'#ffffff'
    },
    logo:{
      width:'fit-content',
      height:'100%',
      marginLeft:'50px'
    },
    logoImg:{
      width:'95px',
      height:'90%',
    },
    navItem:{

    }
}))
const Navbar = () => {
    const classes=useStyle();
  return (
    <Box className={classes.outer}>
      <Box className={classes.logo}>
        <img src="/img/logo.png" className={classes.logoImg}/>
      </Box>
      <Box className={classes.navItem}>

      </Box>
    </Box>
  )
}

export default Navbar