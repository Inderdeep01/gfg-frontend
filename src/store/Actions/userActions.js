import { URL } from "../../ServerURL";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../Constants/UserConstants"
import axios from 'axios';

export const login=(email,password)=>async(dispatch)=>{
    dispatch({type:USER_LOGIN_REQUEST});
    try
    {
        const config={
            headers:{
                "Content-Type":'application/json',
            }
        }
        const {data}=await axios.post(`${URL}/login`,{email,password},config);
        localStorage.setItem('userInfo',JSON.stringify(data));
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }

}


export const signup=(firstName,lastName,email,password)=>async(dispatch)=>{
    dispatch({type:USER_SIGNUP_REQUEST});
    try{
        const config={
            headers:{
                'Content-Type':'application/json',
            }
        }
        const {data}=await axios.post(`${URL}/signup`,{firstName,lastName,email,password},config);
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
        dispatch({type:USER_SIGNUP_SUCCESS});
    }catch(error)
    {
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}
export const logout=()=>async(dispatch)=>{
    dispatch({type:USER_LOGOUT});
    localStorage.removeItem('userInfo')
}