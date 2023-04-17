import { GET_ACCOUNT_BALANCE_FAIL, GET_ACCOUNT_BALANCE_REQUEST, GET_ACCOUNT_BALANCE_SUCCESS } from "../Constants/AccountBalanceConstant";
import { USER_LOGOUT } from "../Constants/UserConstants";

export const accountBalanceReducer=(state={},action)=>{
    switch(action.type)
    {
        case GET_ACCOUNT_BALANCE_REQUEST:
            return {loading:true}
        case GET_ACCOUNT_BALANCE_SUCCESS:
            return {loading:false,balances:action.payload}
        case GET_ACCOUNT_BALANCE_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}