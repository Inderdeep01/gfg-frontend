import { USER_LOGOUT } from "../Constants/UserConstants";
import { GET_CARDS_FAIL, GET_CARDS_REQUEST, GET_CARDS_SUCCESS } from "../Constants/cardConstants";


export const cardReducer=(state={},action)=>{
    switch(action.type)
    {
        case GET_CARDS_REQUEST:
            return {loading:true}
        case GET_CARDS_SUCCESS:
            return {loading:false,cards:action.payload}
        case GET_CARDS_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}