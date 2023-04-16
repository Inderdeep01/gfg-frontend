import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GenerateCard from './GenerateCard';
import AddACard from './AddACard';

const useStyle=makeStyles((theme)=>({
    outer:{
        cursor:'pointer',
        width:'98%',
        height:'70px',
        borderRadius:'15px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        border:'3px dashed lightgrey'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        outline:'0px solid white',
        width:'300px',
        display:'flex',
        flexDirection:'column',
        height:'fit-content',
        overflow:'hidden',
        borderRadius:'20px',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
      },
      item:{
        width:'100%',
        height:'50px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        fontSize:'18px',
        borderBottom:'1px solid grey',
        '&:hover':{
            background:'#d3d3d3'
        }
      },
      close:{
        // background:'#dadada',
        color:'red',
        borderBottom:'0px solid grey',
        fontWeight:'600'
      }
}))
const AddCard = () => {
    const classes=useStyle();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <Box sx={{
        width:'100%',
        height:'100%'
    }}>
        <Box className={classes.outer} onClick={handleOpen}>
            <AddIcon sx={{
                color:'#cecece',
                fontSize:'30px'
            }}/>
        </Box>
      <GenerateCard open={open} setOpen={setOpen}/>
    </Box>
  )
}

export default AddCard