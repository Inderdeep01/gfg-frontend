import React, { useRef, useState } from "react";
import './ResetPassword.css'
import { TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { URL } from "../ServerURL";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password,setPassword]=useState('');
  const [visible,setVisible]=useState(false);
  const [cPassword,setCpassword]=useState('');
  const [cVisible,setCvisible]=useState(false);
  const passRef=useRef();

  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState('');
  const {id,token}=useParams();
  const handleSubmit=async()=>{
    setError('');
    if(password!==cPassword){
      return setError('New Password and Confirm Password doesnt Match')
    }
    setLoading(true);
    try{
      const config={
          headers:{
              "Content-Type":'application/json',
          }
      }
      const {data}=await axios.post(`${URL}/resetPass/${id}/${token}`,{
        password:password
      },config);
      setLoading(false);
      setSuccess(true);
    }catch(err){
      var e=err.response && err.response.data.message? err.response.data.message:err.message;
      setError(e);
      setLoading(false);
    }
  }
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <div>
          <img src="/img/IPBS.png" id="signupLogo" />

          <h2 className="formTitle">Reset Password</h2>

          <div className="inputDiv">
            <TextField
            id="filled-adornment-password"
            color='success'
            value={password}
            onKeyUp={(e)=>{
              if(e.key==='Enter'){
                passRef.current.querySelector('input').focus()
              }
            }}
            label='New Password' 
            variant="outlined"
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
          </div>

          <div className="inputDiv" style={{
            marginTop:'30px'
          }}>
            <TextField
            id="filled-adornment-password"
            value={cPassword}
            ref={passRef}
            onKeyUp={(e)=>{
              if(e.key==='Enter'){
                handleSubmit();
              }
            }}
            label='Confirm Password' 
            variant="outlined"
            onChange={(e)=>{setCpassword(e.target.value)}}
            type={cVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={()=>setCvisible(!cVisible)}
                      >
                      {cVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
              ),
            }}
            />
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
              onClick={handleSubmit}
            >
              <span>Continue</span>
              {loading && <span id="loader"></span>}
            </button>
          </div>
          <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'20px'}}>
            {error?<span style={{color:'red'}}>{error}</span>:
            <span style={{color:'green'}}>Password Changed Successfully</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
