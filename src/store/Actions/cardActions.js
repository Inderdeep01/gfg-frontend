import axios from "axios";
import { GET_CARDS_FAIL, GET_CARDS_REQUEST, GET_CARDS_SUCCESS } from "../Constants/cardConstants";
import { URL } from "../../ServerURL";

export const getCards=()=>async(dispatch,getState)=>{
    dispatch({type:GET_CARDS_REQUEST});
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
        const {data}=await axios.get(`${URL}/card`,config);
        dispatch({type:GET_CARDS_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({
            type:GET_CARDS_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }

}
