import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css'
const useStyle=makeStyles((theme)=>({
    outer:{
        overflow:'hidden',
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:'25px',
        borderBottomLeftRadius:'25px',
        background:'transparent',
    },
    image:{
        width:'100%',
        height:'575px',
        [theme.breakpoints.down("sm")]:{
            height:'540px'
        },
        // borderTopLeftRadius:'20px',
        // // borderRadius:'20px',
        // borderBottomLeftRadius:'20px',
        // position:'absolute'
    },
    text:{
        textAlign:'center',
        color:'white',
        position: "absolute",
        left: "5%",
        top:'35%',
        [theme.breakpoints.down("md")]:{
            top:'28%'
        },
        fontSize:'20px',
        // color: "white",
        textShadow: '-2px 13px 14px rgba(0, 0, 0, 1)',
    }
}))

const Carousel = ({activeIndex,setActiveIndex}) => {
    const classes=useStyle();
    const images=[
        'https://i.ytimg.com/vi/-MKapbz0GIo/maxresdefault.jpg',
        'https://media.istockphoto.com/id/1267493984/vector/blockchain-technology-abstract-background.jpg?s=612x612&w=0&k=20&c=11RRCbkDSml09Y2fK5on7CpbU_78qrTndbAyR7KtQKc=',
        'https://wallpaperaccess.com/full/1267581.jpg',
        'https://financialit.net/sites/default/files/717c7df2-b5fe-43b0-b957-7c24ef224f00.jpeg'
    ]
    const text=[
        'INTERPLANETRY BANKING SYSTEM',
        'Pay From Anywhere to Anyone',
        'Provides Blockchain 3.0 Security and Privacy',
        'Money Transfer More Easy and More Available'
    ]
    const items=images.map((img,index)=>{
        return (
            <div className={`item ${classes.carouselItem}`} data-value={`${index+1}`}>
                <div style={{
                    background:`url(${img})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    backgroundRepeat:'no-repeat'
                }} className={classes.image}/>
                <div className={classes.text}><h1>{text[index]}</h1></div>
            </div>
        )
    })
    return(
        <Box className={classes.outer}>
            <AliceCarousel
            responsive={{0: { items: 1 }}}
            controlsStrategy="alternate"
            activeIndex={activeIndex}
            onSlideChanged={(e)=>{setActiveIndex(e.slide)}}
            mouseTracking
            infinite
            autoPlayInterval={3000}
            animationDuration={1500}
            // disableDotsControls
            disableButtonsControls
            autoPlay
            items={items}
        />
        </Box>
    );
};

export default Carousel