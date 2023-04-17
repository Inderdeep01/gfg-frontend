import axios from "axios";
import { URL } from "../../ServerURL";
import { GET_ACCOUNT_BALANCE_FAIL, GET_ACCOUNT_BALANCE_REQUEST, GET_ACCOUNT_BALANCE_SUCCESS } from "../Constants/AccountBalanceConstant";

export const getbalance=()=>async(dispatch,getState)=>{
    dispatch({type:GET_ACCOUNT_BALANCE_REQUEST});
    try
    {
        const {userLogin}=getState();
        const {userInfo}=userLogin
        const {token}=userInfo
        const config={
            headers:{
                "Content-Type":'application/json',
                'Authorization':`Bearer ${token}`
            }
        }
        const {data}=await axios.get(`${URL}/balance`,config);
        dispatch({type:GET_ACCOUNT_BALANCE_SUCCESS,payload:data});
    }
    catch(err)
    {
        var e=err.response && err.response.data.message? err.response.data.message:err.message;
        dispatch({type:GET_ACCOUNT_BALANCE_FAIL,payload:e});
    }
}