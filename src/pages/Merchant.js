import React, { useEffect, useState } from 'react'
import './Merchant.css'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios'
import { URL } from '../ServerURL'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const useStyle=makeStyles((theme)=>({
    textfield:{
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Remove the outline border
            },
            '&:hover fieldset': {
              border: 'none', // Remove the outline border on hover
            },
            '&.Mui-focused fieldset': {
              border: 'none', // Remove the outline border when focused
            },
          },
    }
}))
const Merchant = () => {
    const classes=useStyle()
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
      const s=io(URL);
      setSocket(s);
      return ()=>{
        s.disconnect();
      }
    },[])
    useEffect(()=>{
      if(socket){
        socket.emit("merchant",'6458f1bc85dc05055242a3e7');
        socket.on("connected",()=>console.log('Connected to websocket'));
      }
    },[socket])
    const [password,setPassword]=useState('');
    const [visible,setVisible]=useState(false);
    const [card,setCard]=useState('');
    const [cvv,setCvv]=useState('');
    const [month,setMonth]=useState('');
    const [year,setYear]=useState('');
    

    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState('');
    const handleSubmit=async()=>{
      if(!card && !month && !year && !cvv && !password){
        return setError('Insufficent Details. Please Fill all the Fields')
      }
      setLoading(true);
      setError('');
      setSuccess(false);
      try{
        const config={
          headers:{
            'Content-Type':'application/json',
          }
        }
        const {data}=await axios.post(`${URL}/merchant`,{
          type:'card',
          merchant:'Netflix',
          cardNumber:card,
          pin:password,
          amount:'800',
          destinationToken:'INR',
          cvv:cvv,
          expiry:month+'/'+year,
        },config)
        console.log(data);
        await socket.emit("merchantTransfer",data);
        setLoading(false);
        setSuccess(true);
      }catch(err){
        setLoading(false);
        var e=err.response && err.response.data.message? err.response.data.message:err.message;
        setError(e);
      }
      }
  return (
    <div>
    <nav className="nav nav-3">
      <a href="">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1600px-Logonetflix.png" alt="" />
      </a>
    </nav>
    <div className="main-container margin-inline">
      <h2>step 3 of 3</h2>
      <h1 className="margin-bottom-1">Card Payment</h1>

      {
        success?
        <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <img src="/img/greenverified.png" style={{width:'100px'}}/>
          <Box sx={{marginTop:'30px',fontSize:'30px',fontWeight:'400'}}>Payment Successful</Box>
        </Box>
        :
        <div className="input-container">
        <Box sx={{width:'100%',display:'flex',gap:'20px',flexDirection:'column'}}>
            <Box sx={{width:'100%',display:'flex',gap:'20px'}}>
            <TextField label="Card Number" variant="outlined" sx={{width:'100%'}} value={card} onChange={(e)=>setCard(e.target.value)}/>
            </Box>
        <Box sx={{display:'flex',gap:'30px'}}>
        <Box sx={{display:'flex',width:'fit-content',alignItems:'center',borderRadius:'3px',border:'1px solid lightgrey',
        '&:hover':{
            border:'1px solid black'
        }
    }}>
                <TextField variant="outlined" sx={{width:'55px'}} className={classes.textfield} placeholder='mm' value={month} onChange={(e)=>setMonth(e.target.value)}/>
                <Box sx={{fontSize:'30px',fontWeight:'200'}}>/</Box>
                <TextField variant="outlined" sx={{width:'55px'}} className={classes.textfield} placeholder='yy' value={year} onChange={(e)=>setYear(e.target.value)}/>
            </Box>
            <TextField label="CVV" variant="outlined" sx={{width:'30%'}} value={cvv} onChange={(e)=>setCvv(e.target.value)}/>
            <TextField
            id="filled-adornment-password"
            value={password}
            label='PIN' 
            variant="outlined"
            sx={{width:'40%'}}
            onChange={(e)=>{setPassword(e.target.value)}}
            type={visible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={()=>setVisible(!visible)}
                      >
                      {visible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
              ),
            }}
            />
        </Box>
        </Box>

        <div className="btn btn-change margin-block margin-inline"  style={{
          width:'93%'
        }}>
          <div className="change">
            <p className="text-change">INR 800/month</p>
            <p className="text-change-1">Premium Plan</p>
          </div>
          <p className="text-change-2">Change</p>
        </div>

        <div className="processed margin-bottom">
          <p className="text-terms">
            By checking the checkbox below, you agree to our <span className="text-terms-1">Terms of Use, Privacy Statement, </span>and that you are over 18. Netflix will automatically continue your membership and charge the membership fee
            (currently INR 800/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
          </p>
        </div>

        <div className="agreement">
          <input className="agree-input" type="checkbox" name="" id="agree" required />
          <label className="agree-label" htmlFor="agree">I agree.</label>
          <p className="agree-alert">You must anknowledge that you have read and agree to the Terms of Use to continue.</p>
        </div>

        <button onClick={handleSubmit} className="btn-wide margin-top-1 margin-inline">{loading?<CircularProgress style={{color:'white'}} size={30}/>:'Start Membership'}</button>
        <Box style={{color:'red',marginTop:'20px',display:'flex',justifyContent:'center',alignItems:'center'}}>{error}</Box>
      </div>}
    </div>

    <footer className="footer footer-gray margin-top-1">
      <div className="footer-container margin-inline">
        <p className="text-gray">
          Questions? <br />
          Call 007-803-321-2130
        </p>
        <div className="links">
          <ul className="">
            <li><a className="text-terms text-underline" href="">FAQ</a></li>
            <li><a className="text-terms text-underline" href="">Cookie Preferences</a></li>
          </ul>

          <ul>
            <li><a className="text-terms text-underline" href="">Help Center</a></li>
            <li><a className="text-terms text-underline" href="">Corporate Information</a></li>
          </ul>

          <a className="text-terms text-underline" href="">Terms of Use</a>

          <a className="text-terms text-underline" href="">Privacy</a>
        </div>

        <div className="language">
          <select className="language-select" defaultValue={"English"}>
            <option value="english">English</option>
            <option value="">Bahasa Indonesia</option>
          </select>
          <div className="language-icon">
            <i className="fas fa-globe globe"></i>
            <i className="fas fa-chevron-down chevron"></i>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Merchant