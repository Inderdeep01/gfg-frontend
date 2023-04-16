import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core'
import { Box } from '@mui/material';
import React from 'react'

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
        height:'500px',
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
}))
const Deposit = ({open,setOpen}) => {
    const handleClose=()=>{
        setOpen(false)
    }
    const classes=useStyle();
  return (
    <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box sx={{
                width:'100%',
                height:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:'20px',
                marginBottom:'40px',
                position:'relative'
            }}>
                <h1 style={{
                    fontSize:'30px',
                    color:'black',
                    position:'absolute',
                    top:'50px'
                }}>DEPOSIT</h1>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Deposit