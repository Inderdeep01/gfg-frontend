import { SET_SOCKET } from "../Constants/TransactionsConstant";
import { USER_LOGOUT } from "../Constants/UserConstants";

export const socketReducer=(state={},action)=>{
    switch(action.type)
    {
        case SET_SOCKET:
            return {socket:action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}