import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../Constants/UserConstants";

export const loginReducer=(state={},action)=>{
    switch(action.type)
    {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case 'REMOVE_LOGIN_ERROR':
            return {loading:false,userInfo:state.userInfo}
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const signupReducer=(state={},action)=>{
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return {loading:true};
        case USER_SIGNUP_SUCCESS:
            return {loading:false}
        case USER_SIGNUP_FAIL:
            return {loading:false,error:action.payload}
            case 'REMOVE_SIGNUP_ERROR':
                return {loading:false,userInfo:state.userInfo}
        default:
            return state;
    }
}