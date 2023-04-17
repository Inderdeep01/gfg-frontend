import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { loginReducer, signupReducer } from './Reducers/userReducer';
import { cardReducer } from './Reducers/cardReducer';
import { accountBalanceReducer } from './Reducers/AccountBalanceReducer';
const reducers=combineReducers({
    userLogin:loginReducer,
    userSignup:signupReducer,
    cardsList:cardReducer,
    accountBalance:accountBalanceReducer
});

const storedUser=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;
const initialState={
    userLogin:{userInfo:storedUser},
    cardsList:{cards:[]},
};

const middleware=[thunk];
const store=createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;